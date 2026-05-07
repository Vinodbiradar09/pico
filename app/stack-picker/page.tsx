import { StackPickerClient } from "@/components/stack-picker/StackPickerClient";
import { SiteNav } from "@/components/stack-picker/SiteNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pico — Stack Picker",
  description:
    "Curate your perfect dev stack from 100+ technologies. Export architecture diagrams and AI scaffold prompts instantly.",
  openGraph: {
    title: "Pico — Pick a stack. Ship it.",
    description:
      "Curate your perfect dev stack from 100+ technologies. Export architecture diagrams and AI scaffold prompts instantly.",
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
        className="mx-auto w-full max-w-7xl px-6 pb-12 pt-20 lg:px-8"
        aria-labelledby="hero-heading"
      >
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Free & Open Source
            </div>

            <h1
              id="hero-heading"
              className="mb-5 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl"
            >
              Pick your stack.{" "}
              <span className="text-blue-600">Ship faster.</span>
            </h1>

            <p className="max-w-lg text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
              Curate your perfect tech stack from 100+ technologies. Export a
              clean architecture diagram or a ready-to-paste AI scaffold prompt
              in one click.
            </p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-2">
            {[
              { label: "Click to select", color: "bg-blue-500" },
              { label: "Click again to remove", color: "bg-zinc-400" },
              { label: "Export when ready", color: "bg-emerald-500" },
            ].map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
              >
                <span className={`h-1.5 w-1.5 rounded-full ${item.color}`} />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <StackPickerClient />
    </div>
  );
}
