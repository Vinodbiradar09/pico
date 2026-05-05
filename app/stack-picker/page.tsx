import { StackPickerClient } from "@/components/stack-picker/StackPickerClient";
import { SiteNav } from "@/components/stack-picker/SiteNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stack Picker — Pico",
  description:
    "Pick your 2026 dev stack layer by layer. Export a clean stack card or a ready-to-paste AI scaffold prompt.",
  openGraph: {
    title: "Pick a stack. Ship it.",
    description:
      "Build your 2026 dev stack and export a clean diagram or AI prompt.",
    url: "https://yoursite.com/stack-picker",
    siteName: "Pico",
  },
};

export const dynamic = "force-static";

export default function StackPickerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-zinc-950">
      <SiteNav />

      <section
        className="mx-auto w-full max-w-7xl px-6 pb-10 pt-14 lg:px-8"
        aria-labelledby="hero-heading"
      >
        <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-zinc-400">
          <span
            className="block h-px w-6 bg-zinc-300 dark:bg-zinc-600"
            aria-hidden="true"
          />
          Stack Picker Tool
        </p>
        <h1
          id="hero-heading"
          className="mb-3 text-5xl font-bold leading-[1.08] tracking-[-0.03em] text-zinc-900 dark:text-zinc-50 lg:text-6xl"
        >
          Pick a <span className="text-blue-600">stack.</span> Ship it.
        </h1>
        <p className="mb-5 max-w-125 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
          Click through each layer to build your 2026 dev stack. Export a clean
          stack card or a ready-to-paste AI prompt.
        </p>
        <div className="flex flex-wrap gap-2" aria-label="Instructions">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-400">
            Single click to select
          </span>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-400">
            Click again to deselect
          </span>
          <span className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
            Picks appear in bottom bar
          </span>
        </div>
      </section>

      <StackPickerClient />
    </div>
  );
}
