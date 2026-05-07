import { StackPickerClient } from "@/components/stack-picker/StackPickerClient";
import { SiteNav } from "@/components/stack-picker/SiteNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pico — Pick your stack. Ship it.",
  description:
    "Choose from 100+ battle-tested technologies across every layer of your stack. Export architecture diagrams and AI scaffold prompts in one click.",
  openGraph: {
    title: "Pico — Pick your stack. Ship it.",
    description:
      "Choose from 100+ battle-tested technologies across every layer of your stack. Export architecture diagrams and AI scaffold prompts in one click.",
    url: "https://pico.dev/stack-picker",
    siteName: "Pico",
  },
};

export const dynamic = "force-static";

export default function StackPickerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-zinc-950">
      <SiteNav />
      <section
        className="mx-auto w-full max-w-7xl px-6 pb-14 pt-16 lg:px-8 lg:pt-20"
        aria-labelledby="hero-heading"
      >
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1
              id="hero-heading"
              className="mb-5 text-[2.6rem] font-bold leading-[1.1] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl"
            >
              Your stack, <br className="hidden sm:block" />
              <span className="text-blue-600">decided.</span>
            </h1>
            <p className="max-w-120 text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
              Stop debating. Pick from 100+ battle-tested technologies across
              every layer then export a clean architecture diagram or a
              ready-to-paste AI scaffold prompt in one click.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  100+
                </p>
                <p className="text-xs font-medium text-zinc-400">
                  Technologies
                </p>
              </div>
              <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  17
                </p>
                <p className="text-xs font-medium text-zinc-400">Categories</p>
              </div>
              <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                  1-click
                </p>
                <p className="text-xs font-medium text-zinc-400">
                  AI scaffold prompt
                </p>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-3 lg:max-w-xs lg:pb-2">
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
              How it works
            </p>
            {[
              {
                step: "1",
                label: "Select your tools",
                desc: "Click any technology to add it to your stack.",
              },
              {
                step: "2",
                label: "Export your blueprint",
                desc: "Download an architecture diagram or copy the AI prompt.",
              },
              {
                step: "3",
                label: "Start building",
                desc: "Paste into any AI assistant. Get a scaffold in seconds.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {item.step}
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {item.label}
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StackPickerClient />
    </div>
  );
}
