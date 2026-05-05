import type { Category, StackItem } from "./stack-data";

export type Selections = Record<string, string>; // catId → itemId

/** Return the selected StackItem for a category, or undefined */
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

/** Build SVG diagram markup for the architecture flow */
export function buildDiagramSvg(
  categories: Category[],
  selections: Selections,
): string {
  const selected = categories
    .map((cat) => ({ cat, item: getSelectedItem(cat, selections) }))
    .filter((x): x is { cat: Category; item: StackItem } => !!x.item);

  const BOX_W = 260;
  const BOX_H = 72;
  const GAP = 32;
  const PADDING_X = 60;
  const PADDING_Y = 60;
  const totalH =
    PADDING_Y * 2 + selected.length * BOX_H + (selected.length - 1) * GAP;
  const totalW = BOX_W + PADDING_X * 2;

  const nodes = selected
    .map(({ cat, item }, i) => {
      const y = PADDING_Y + i * (BOX_H + GAP);
      const cx = PADDING_X + BOX_W / 2;

      return `
    <!-- ${cat.title} -->
    <line x1="${cx}" y1="${i === 0 ? y - 1 : y - GAP / 2 + 4}" x2="${cx}" y2="${y}" stroke="#d4d4d0" stroke-width="1" stroke-dasharray="4,3"/>
    <rect x="${PADDING_X}" y="${y}" width="${BOX_W}" height="${BOX_H}" rx="12" fill="white" stroke="#e5e5e2" stroke-width="1"/>
    <image href="${item.iconUrl}" x="${PADDING_X + 16}" y="${y + (BOX_H - 28) / 2}" width="28" height="28" style="image-rendering:auto"/>
    <text x="${PADDING_X + 56}" y="${y + BOX_H / 2 - 6}" font-family="Geist, system-ui, sans-serif" font-size="10" font-weight="600" fill="#a1a19d" letter-spacing="0.08em" text-transform="uppercase">${cat.subtitle.toUpperCase()}</text>
    <text x="${PADDING_X + 56}" y="${y + BOX_H / 2 + 12}" font-family="Geist, system-ui, sans-serif" font-size="15" font-weight="600" fill="#0a0a09">${item.name}</text>
  `;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}">
  <rect width="${totalW}" height="${totalH}" fill="#f8f8f6"/>
  <text x="${PADDING_X}" y="32" font-family="Geist, system-ui, sans-serif" font-size="10" font-weight="600" fill="#a1a19d" letter-spacing="0.1em">SYSTEM DESIGN · ARCHITECTURE</text>
  <text x="${PADDING_X}" y="52" font-family="Geist, system-ui, sans-serif" font-size="22" font-weight="700" fill="#0a0a09" letter-spacing="-0.03em">My 2026 Stack.</text>
  ${nodes}
  <text x="${PADDING_X}" y="${totalH - 16}" font-family="Geist, system-ui, sans-serif" font-size="10" font-weight="500" fill="#c0c0bc">${selected.length} LAYERS · PICO</text>
</svg>`;
}

/** Build the stack-card SVG (2-col grid layout) */
export function buildCardSvg(
  categories: Category[],
  selections: Selections,
): string {
  const selected = categories
    .map((cat) => ({ cat, item: getSelectedItem(cat, selections) }))
    .filter((x): x is { cat: Category; item: StackItem } => !!x.item);

  const COLS = 3;
  const CELL_W = 380;
  const CELL_H = 90;
  const GAP = 12;
  const PAD = 48;
  const rows = Math.ceil(selected.length / COLS);
  const totalW = COLS * CELL_W + (COLS - 1) * GAP + PAD * 2;
  const totalH = PAD + 80 + rows * CELL_H + (rows - 1) * GAP + PAD + 24;

  const cells = selected
    .map(({ cat, item }, i) => {
      const col = i % COLS;
      const row = Math.floor(i / COLS);
      const x = PAD + col * (CELL_W + GAP);
      const y = PAD + 80 + row * (CELL_H + GAP);
      return `
    <rect x="${x}" y="${y}" width="${CELL_W}" height="${CELL_H}" rx="12" fill="white" stroke="#e5e5e2" stroke-width="1"/>
    <image href="${item.iconUrl}" x="${x + 16}" y="${y + (CELL_H - 32) / 2}" width="32" height="32"/>
    <text x="${x + 62}" y="${y + CELL_H / 2 - 5}" font-family="Geist, system-ui, sans-serif" font-size="9" font-weight="600" fill="#2563eb" letter-spacing="0.1em">${cat.subtitle.toUpperCase()}</text>
    <text x="${x + 62}" y="${y + CELL_H / 2 + 14}" font-family="Geist, system-ui, sans-serif" font-size="17" font-weight="600" fill="#0a0a09">${item.name}</text>
  `;
    })
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="${totalH}" viewBox="0 0 ${totalW} ${totalH}">
  <rect width="${totalW}" height="${totalH}" fill="#f8f8f6"/>
  <text x="${PAD}" y="${PAD + 14}" font-family="Geist, system-ui, sans-serif" font-size="10" font-weight="600" fill="#a1a19d" letter-spacing="0.1em">YOUR STACK · 2026</text>
  <text x="${PAD}" y="${PAD + 52}" font-family="Geist, system-ui, sans-serif" font-size="36" font-weight="700" fill="#0a0a09" letter-spacing="-0.03em">My 2026 Stack.</text>
  ${cells}
  <text x="${PAD}" y="${totalH - 16}" font-family="Geist, system-ui, sans-serif" font-size="10" font-weight="500" fill="#c0c0bc">${selected.length} LAYERS · PICO</text>
</svg>`;
}

/** Download an SVG string as a .svg file */
export function downloadSvg(svgString: string, filename: string): void {
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/** Convert SVG to PNG via Canvas and download */
export async function downloadPng(
  svgString: string,
  filename: string,
  scale = 2,
): Promise<void> {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
  const svgEl = svgDoc.documentElement;
  const w = parseInt(svgEl.getAttribute("width") || "800");
  const h = parseInt(svgEl.getAttribute("height") || "600");

  const canvas = document.createElement("canvas");
  canvas.width = w * scale;
  canvas.height = h * scale;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);

  const img = new Image();
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);

  await new Promise<void>((resolve, reject) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      resolve();
    };
    img.onerror = reject;
    img.src = url;
  });

  URL.revokeObjectURL(url);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }, "image/png");
}
