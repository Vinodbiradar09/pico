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
 * Base64 data URIs are same-origin and always work in canvas.
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

const DIAGRAM_LAYER_DEFS: Array<{
  label: string;
  catIds: string[];
  special?: "user";
}> = [
  { label: "ENTRY", catIds: [], special: "user" },
  { label: "HOSTING / COMPUTE", catIds: ["hosting"] },
  { label: "FRONTEND", catIds: ["frontend", "styling"] },
  { label: "BACKEND RUNTIME", catIds: ["runtime"] },
  { label: "IDENTITY & STORAGE", catIds: ["auth", "storage"] },
  {
    label: "EXTERNAL SERVICES",
    catIds: ["email", "payments", "ai", "search", "cms"],
  },
  { label: "DATA LAYER", catIds: ["orm"] },
  { label: "PERSISTENCE", catIds: ["database"] },
  {
    label: "OBSERVABILITY & DELIVERY",
    catIds: ["monitoring", "productanalytics", "webanalytics", "cicd"],
  },
];

/** Roughly truncate text so it fits inside an SVG box without overflowing. */
function truncateSvgText(
  text: string,
  maxWidth: number,
  fontSize: number,
): string {
  // system-ui runs narrower than classic web fonts
  const avgCharWidth = fontSize * (text === text.toUpperCase() ? 0.52 : 0.58);
  const maxChars = Math.floor(maxWidth / avgCharWidth);
  if (text.length <= maxChars) return text;
  if (maxChars <= 3) return text.slice(0, maxChars);
  return text.slice(0, maxChars - 3) + "...";
}

function buildDiagramSvgInternal(
  selected: { cat: Category; item: StackItem }[],
  iconMap: Map<string, string>,
): string {
  const BOX_H = 68;
  const BOX_GAP = 12; // horizontal gap between sibling boxes in one row
  const ROW_SPACING = 58; // vertical gap between rows (includes arrow)
  const SECTION_LABEL_H = 20; // small-caps label height above each row
  const PAD_X = 50;
  const PAD_TOP = 80; // space reserved for the title header
  const PAD_BOT = 48;

  const selectedMap = new Map(selected.map((s) => [s.cat.id, s]));

  type ResolvedLayer = {
    label: string;
    items: { cat: Category; item: StackItem }[];
    special?: "user";
  };

  const layers: ResolvedLayer[] = [];

  for (const def of DIAGRAM_LAYER_DEFS) {
    if (def.special === "user") {
      layers.push({ label: def.label, items: [], special: "user" });
    } else {
      const items = def.catIds
        .map((id) => selectedMap.get(id))
        .filter((x): x is { cat: Category; item: StackItem } => !!x);
      if (items.length > 0) {
        layers.push({ label: def.label, items });
      }
    }
  }

  const maxItemsInLayer = Math.max(
    ...layers.filter((l) => l.special !== "user").map((l) => l.items.length),
    1,
  );
  const MIN_BOX_W = 200;
  const SVG_W = Math.max(
    800,
    PAD_X * 2 + maxItemsInLayer * MIN_BOX_W + (maxItemsInLayer - 1) * BOX_GAP,
  );
  const CONTENT_W = SVG_W - PAD_X * 2;
  const cx = SVG_W / 2;
  const layerCount = layers.length;
  const totalH =
    PAD_TOP +
    layerCount * (SECTION_LABEL_H + BOX_H) +
    (layerCount - 1) * ROW_SPACING +
    PAD_BOT;

  let body = "";
  let y = PAD_TOP;

  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];

    body += `  <text x="${PAD_X}" y="${y + 14}" font-family="system-ui,sans-serif" font-size="9" font-weight="600" fill="#a1a19d" letter-spacing="1.5">${escapeXml(layer.label)}</text>\n`;
    y += SECTION_LABEL_H;

    if (layer.special === "user") {
      const bw = 240;
      const bx = cx - bw / 2;
      body += `  <rect x="${bx}" y="${y}" width="${bw}" height="${BOX_H}" rx="12" fill="#2563eb"/>\n`;
      body += `  <text x="${bx + 20}" y="${y + 24}" font-family="system-ui,sans-serif" font-size="8" font-weight="700" fill="rgba(255,255,255,0.65)" letter-spacing="1.5">ENTRY POINT</text>\n`;
      body += `  <text x="${bx + 20}" y="${y + 48}" font-family="system-ui,sans-serif" font-size="17" font-weight="700" fill="white">User · Browser</text>\n`;
    } else {
      const count = layer.items.length;
      let boxW: number;
      let startX: number;

      if (count === 1) {
        boxW = Math.min(360, Math.max(300, Math.floor(CONTENT_W * 0.5)));
        startX = cx - boxW / 2;
      } else {
        boxW = Math.floor((CONTENT_W - (count - 1) * BOX_GAP) / count);
        startX = PAD_X;
      }

      const textMaxWidth = boxW - 70;

      for (let j = 0; j < count; j++) {
        const { cat, item } = layer.items[j];
        const bx = startX + j * (boxW + BOX_GAP);
        const src = iconMap.get(item.iconUrl) ?? fallbackIcon();

        const titleText = truncateSvgText(
          cat.title.toUpperCase(),
          textMaxWidth,
          8,
        );
        const nameText = truncateSvgText(item.name, textMaxWidth, 14);

        body += `  <rect x="${bx}" y="${y}" width="${boxW}" height="${BOX_H}" rx="10" fill="white" stroke="#e5e5e2" stroke-width="1"/>\n`;
        body += `  <image href="${src}" x="${bx + 14}" y="${y + (BOX_H - 28) / 2}" width="28" height="28"/>\n`;
        body += `  <text x="${bx + 54}" y="${y + BOX_H / 2 - 5}" font-family="system-ui,sans-serif" font-size="8" font-weight="600" fill="#2563eb" letter-spacing="1.2">${escapeXml(titleText)}</text>\n`;
        body += `  <text x="${bx + 54}" y="${y + BOX_H / 2 + 13}" font-family="system-ui,sans-serif" font-size="14" font-weight="600" fill="#0a0a09">${escapeXml(nameText)}</text>\n`;
      }
    }

    y += BOX_H;

    if (i < layers.length - 1) {
      const lineTop = y + 8;
      const lineBot = y + ROW_SPACING - 8;
      const headH = 8;
      body += `  <line x1="${cx}" y1="${lineTop}" x2="${cx}" y2="${lineBot - headH}" stroke="#d4d4d0" stroke-width="1.5"/>\n`;
      body += `  <polygon points="${cx},${lineBot} ${cx - 5},${lineBot - headH} ${cx + 5},${lineBot - headH}" fill="#d4d4d0"/>\n`;
      y += ROW_SPACING;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SVG_W}" height="${totalH}" viewBox="0 0 ${SVG_W} ${totalH}">
  <rect width="${SVG_W}" height="${totalH}" fill="#f8f8f6"/>
  <text x="${PAD_X}" y="24" font-family="system-ui,sans-serif" font-size="10" font-weight="600" fill="#a1a19d" letter-spacing="2">SYSTEM DESIGN · ARCHITECTURE</text>
  <text x="${PAD_X}" y="56" font-family="system-ui,sans-serif" font-size="26" font-weight="700" fill="#0a0a09" letter-spacing="-0.5">My 2026 Stack.</text>
${body}  <text x="${PAD_X}" y="${totalH - 14}" font-family="system-ui,sans-serif" font-size="10" fill="#c0c0bc">${layers.length} LAYERS · PICO</text>
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

export async function downloadPng(
  svgString: string,
  filename: string,
): Promise<void> {
  const blob = await svgStringToBlob(svgString, 2);
  triggerDownload(blob, filename);
}

export async function downloadStackPng(
  categories: Category[],
  selections: Selections,
): Promise<void> {
  const svg = await buildCardSvg(categories, selections);
  await downloadPng(svg, "my-stack.png");
}

export async function downloadDiagramPng(
  categories: Category[],
  selections: Selections,
): Promise<void> {
  const svg = await buildDiagramSvg(categories, selections);
  await downloadPng(svg, "my-stack-diagram.png");
}
