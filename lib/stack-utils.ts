import type { Category, StackItem } from "./stack-data";

export type Selections = Record<string, string>; // catId → itemId

export function getSelectedItem(
  category: Category,
  selections: Selections,
): StackItem | undefined {
  const id = selections[category.id];
  return id ? category.items.find((i) => i.id === id) : undefined;
}

/** Build the AI scaffolding prompt */
export function buildPrompt(
  categories: Category[],
  selections: Selections,
): string {
  const lines = categories
    .map((cat) => {
      const item = getSelectedItem(cat, selections);
      return item ? `- ${cat.title}: ${item.name}` : null;
    })
    .filter(Boolean)
    .join("\n");

  return (
    `I'm building a new web application with the following tech stack:\n\n` +
    `${lines}\n\n` +
    `Please help me scaffold this project. Set up the initial project structure, ` +
    `configuration files, and a basic working example that connects all layers. ` +
    `Follow best practices for each technology. Make it production-ready with proper ` +
    `error handling, environment variable management, and TypeScript support where applicable.`
  );
}

/** Escape text so it is safe inside SVG text nodes and attributes */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** 1×1 transparent PNG — safe fallback that never breaks canvas */
function fallbackIcon(): string {
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
}

function blobToDataUri(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Fetch a single icon URL → base64 data URI.
 * Falls back to transparent PNG so the export never throws.
 */
async function fetchIconAsDataUri(url: string): Promise<string> {
  if (!url) return fallbackIcon();
  try {
    const res = await fetch(url);
    if (!res.ok) return fallbackIcon();
    const blob = await res.blob();
    return await blobToDataUri(blob);
  } catch {
    return fallbackIcon();
  }
}

/**
 * Pre-fetch all unique icon URLs and return a Map<iconUrl, dataUri>.
 * This is the key fix — canvas refuses to draw cross-origin images,
 * but base64 data URIs are same-origin and always work.
 */
async function prefetchIcons(
  selected: { item: StackItem }[],
): Promise<Map<string, string>> {
  const uniqueUrls = [
    ...new Set(selected.map((s) => s.item.iconUrl).filter(Boolean)),
  ];
  const pairs = await Promise.all(
    uniqueUrls.map(
      async (url) => [url, await fetchIconAsDataUri(url)] as const,
    ),
  );
  return new Map(pairs);
}

/** Stack card — 3-col grid matching my-stack.png */
function buildCardSvgInternal(
  selected: { cat: Category; item: StackItem }[],
  iconMap: Map<string, string>,
): string {
  const COLS = 3;
  const CELL_W = 320;
  const CELL_H = 84;
  const GAP_X = 12;
  const GAP_Y = 12;
  const PAD_X = 40;
  const PAD_TOP = 80;
  const PAD_BOT = 40;

  const rows = Math.ceil(selected.length / COLS);
  const totalW = COLS * CELL_W + (COLS - 1) * GAP_X + PAD_X * 2;
  const totalH = PAD_TOP + rows * CELL_H + (rows - 1) * GAP_Y + PAD_BOT + 24;

  const cells = selected
    .map(({ cat, item }, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const x = PAD_X + col * (CELL_W + GAP_X);
      const y = PAD_TOP + row * (CELL_H + GAP_Y);
      const src = iconMap.get(item.iconUrl) ?? fallbackIcon();

      return `
  <rect x="${x}" y="${y}" width="${CELL_W}" height="${CELL_H}" rx="12" fill="white" stroke="#e5e5e2" stroke-width="1"/>
  <image href="${src}" x="${x + 16}" y="${y + (CELL_H - 32) / 2}" width="32" height="32"/>
  <text x="${x + 60}" y="${y + CELL_H / 2 - 6}" font-family="system-ui,sans-serif" font-size="9" font-weight="600" fill="#2563eb" letter-spacing="1">${escapeXml(cat.subtitle.toUpperCase())}</text>
  <text x="${x + 60}" y="${y + CELL_H / 2 + 13}" font-family="system-ui,sans-serif" font-size="15" font-weight="600" fill="#0a0a09">${escapeXml(item.name)}</text>`;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}">
  <rect width="${totalW}" height="${totalH}" fill="#f8f8f6"/>
  <text x="${PAD_X}" y="28" font-family="system-ui,sans-serif" font-size="10" font-weight="600" fill="#a1a19d" letter-spacing="2">YOUR STACK · 2026</text>
  <text x="${PAD_X}" y="60" font-family="system-ui,sans-serif" font-size="30" font-weight="700" fill="#0a0a09" letter-spacing="-1">My 2026 Stack.</text>
  ${cells}
  <text x="${PAD_X}" y="${totalH - 12}" font-family="system-ui,sans-serif" font-size="10" fill="#c0c0bc">${selected.length} LAYERS · PICO</text>
</svg>`;
}

/** Architecture diagram — vertical flow matching my-stack-diagram.png */
function buildDiagramSvgInternal(
  selected: { cat: Category; item: StackItem }[],
  iconMap: Map<string, string>,
): string {
  const BOX_W = 280;
  const BOX_H = 68;
  const GAP = 28;
  const PAD_X = 56;
  const PAD_TOP = 72;
  const PAD_BOT = 40;

  const totalW = BOX_W + PAD_X * 2;
  const totalH =
    PAD_TOP + selected.length * BOX_H + (selected.length - 1) * GAP + PAD_BOT;
  const cx = PAD_X + BOX_W / 2;

  const nodes = selected
    .map(({ cat, item }, i) => {
      const y = PAD_TOP + i * (BOX_H + GAP);
      const src = iconMap.get(item.iconUrl) ?? fallbackIcon();
      const connector =
        i > 0
          ? `<line x1="${cx}" y1="${y - GAP}" x2="${cx}" y2="${y}" stroke="#d4d4d0" stroke-width="1.5" stroke-dasharray="4,3"/>`
          : "";

      return `
  ${connector}
  <rect x="${PAD_X}" y="${y}" width="${BOX_W}" height="${BOX_H}" rx="10" fill="white" stroke="#e5e5e2" stroke-width="1"/>
  <image href="${src}" x="${PAD_X + 14}" y="${y + (BOX_H - 28) / 2}" width="28" height="28"/>
  <text x="${PAD_X + 54}" y="${y + BOX_H / 2 - 6}" font-family="system-ui,sans-serif" font-size="9" font-weight="600" fill="#a1a19d" letter-spacing="1">${escapeXml(cat.subtitle.toUpperCase())}</text>
  <text x="${PAD_X + 54}" y="${y + BOX_H / 2 + 12}" font-family="system-ui,sans-serif" font-size="14" font-weight="600" fill="#0a0a09">${escapeXml(item.name)}</text>`;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}">
  <rect width="${totalW}" height="${totalH}" fill="#f8f8f6"/>
  <text x="${PAD_X}" y="26" font-family="system-ui,sans-serif" font-size="10" font-weight="600" fill="#a1a19d" letter-spacing="2">SYSTEM DESIGN · ARCHITECTURE</text>
  <text x="${PAD_X}" y="54" font-family="system-ui,sans-serif" font-size="22" font-weight="700" fill="#0a0a09" letter-spacing="-0.5">My 2026 Stack.</text>
  ${nodes}
  <text x="${PAD_X}" y="${totalH - 10}" font-family="system-ui,sans-serif" font-size="10" fill="#c0c0bc">${selected.length} LAYERS · PICO</text>
</svg>`;
}

async function svgStringToBlob(svgString: string, scale = 2): Promise<Blob> {
  const parser = new DOMParser();
  const svgEl = parser.parseFromString(
    svgString,
    "image/svg+xml",
  ).documentElement;
  const w = parseInt(svgEl.getAttribute("width") ?? "800");
  const h = parseInt(svgEl.getAttribute("height") ?? "600");

  const canvas = document.createElement("canvas");
  canvas.width = w * scale;
  canvas.height = h * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  // Use a Blob URL — base64 data URIs inside the SVG are already same-origin
  const svgBlob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });
  const svgUrl = URL.createObjectURL(svgBlob);

  await new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      resolve();
    };
    img.onerror = () => reject(new Error("SVG render failed"));
    img.src = svgUrl;
  });

  URL.revokeObjectURL(svgUrl);

  return new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("canvas.toBlob failed"))),
      "image/png",
    ),
  );
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Build the stack card SVG string (handles icon prefetching internally) */
export async function buildCardSvg(
  categories: Category[],
  selections: Selections,
): Promise<string> {
  const selected = categories
    .map((cat) => ({ cat, item: getSelectedItem(cat, selections) }))
    .filter((x): x is { cat: Category; item: StackItem } => !!x.item);

  const iconMap = await prefetchIcons(selected);
  return buildCardSvgInternal(selected, iconMap);
}

/** Build the architecture diagram SVG string (handles icon prefetching internally) */
export async function buildDiagramSvg(
  categories: Category[],
  selections: Selections,
): Promise<string> {
  const selected = categories
    .map((cat) => ({ cat, item: getSelectedItem(cat, selections) }))
    .filter((x): x is { cat: Category; item: StackItem } => !!x.item);

  const iconMap = await prefetchIcons(selected);
  return buildDiagramSvgInternal(selected, iconMap);
}

/** Convert an SVG string to a 2× PNG and trigger browser download */
export async function downloadPng(
  svgString: string,
  filename: string,
): Promise<void> {
  const blob = await svgStringToBlob(svgString, 2);
  triggerDownload(blob, filename);
}

/** Download the stack card as a 2× PNG */
export async function downloadStackPng(
  categories: Category[],
  selections: Selections,
): Promise<void> {
  const svg = await buildCardSvg(categories, selections);
  await downloadPng(svg, "my-stack.png");
}

/** Download the architecture diagram as a 2× PNG */
export async function downloadDiagramPng(
  categories: Category[],
  selections: Selections,
): Promise<void> {
  const svg = await buildDiagramSvg(categories, selections);
  await downloadPng(svg, "my-stack-diagram.png");
}
