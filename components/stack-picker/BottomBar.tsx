"use client";
import { Copy, Download, RotateCcw, FileImage } from "lucide-react";
import type { Selections } from "@/lib/stack-utils";
import { BottomBarChip } from "./BottomBarChip";
import { CATEGORIES } from "@/lib/stack-data";
import { PromptModal } from "./PromptModal";
import { useState } from "react";
import {
  getSelectedItem,
  buildPrompt,
  buildCardSvg,
  buildDiagramSvg,
  downloadPng,
} from "@/lib/stack-utils";

interface BottomBarProps {
  selections: Selections;
  hasAny: boolean;
  onReset: () => void;
}

export function BottomBar({ selections, hasAny, onReset }: BottomBarProps) {
  const [promptOpen, setPromptOpen] = useState(false);
  const [downloading, setDownloading] = useState<"png" | "diagram" | null>(
    null,
  );

  const prompt = hasAny ? buildPrompt(CATEGORIES, selections) : "";

  async function handleDownloadPng() {
    setDownloading("png");
    try {
      const svg = await buildCardSvg(CATEGORIES, selections);
      await downloadPng(svg, "my-stack.png");
    } finally {
      setDownloading(null);
    }
  }

  async function handleDownloadDiagram() {
    setDownloading("diagram");
    try {
      const svg = await buildDiagramSvg(CATEGORIES, selections);
      await downloadPng(svg, "my-stack-diagram.png");
    } finally {
      setDownloading(null);
    }
  }

  return (
    <>
      <footer
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white/90 px-6 py-3 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/90"
        aria-label="Your selected stack"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <span className="hidden shrink-0 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 sm:block">
            Your Stack
          </span>

          <div
            className="flex flex-1 gap-2 overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-live="polite"
            aria-label="Selected technologies"
          >
            {CATEGORIES.map((cat) => {
              const item = getSelectedItem(cat, selections);
              return <BottomBarChip key={cat.id} category={cat} item={item} />;
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              disabled={!hasAny}
              onClick={() => setPromptOpen(true)}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Copy prompt</span>
              <span className="sm:hidden">Prompt</span>
            </button>

            <button
              disabled={!hasAny || downloading === "png"}
              onClick={handleDownloadPng}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {downloading === "png" ? "Exporting…" : "Download PNG"}
              </span>
            </button>

            <button
              disabled={!hasAny || downloading === "diagram"}
              onClick={handleDownloadDiagram}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
            >
              <FileImage className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {downloading === "diagram" ? "Exporting…" : "Download diagram"}
              </span>
            </button>

            <button
              onClick={onReset}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 active:scale-[.98] dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-red-900 dark:hover:bg-red-950/30 dark:hover:text-red-400"
              aria-label="Reset all selections"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>
      </footer>

      <PromptModal
        open={promptOpen}
        prompt={prompt}
        onClose={() => setPromptOpen(false)}
      />
    </>
  );
}
