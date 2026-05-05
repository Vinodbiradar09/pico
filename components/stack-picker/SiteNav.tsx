import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 flex h-13 items-center gap-3 border-b border-zinc-200 bg-zinc-50/90 px-6 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90 lg:px-8">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 focus-visible:outline-none"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-900 dark:bg-zinc-100">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="4" height="4" rx="1" fill="white" />
            <rect x="8" y="2" width="4" height="4" rx="1" fill="white" />
            <rect x="2" y="8" width="4" height="4" rx="1" fill="white" />
            <rect x="8" y="8" width="4" height="4" rx="1" fill="white" />
          </svg>
        </div>
        <span className="text-sm font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
          PICO
        </span>
      </Link>

      <div className="flex-1" />

      {/* Nav links */}
      <nav className="flex items-center gap-1" aria-label="Main navigation">
        <Link
          href="/tools"
          className="rounded-lg px-3 py-1.5 text-sm text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          Tools
        </Link>
        <Link
          href="/sponsor"
          className="rounded-lg px-3 py-1.5 text-sm text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          Sponsor
        </Link>
        <Button
          asChild
          className="ml-2 h-8 rounded-full bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          <Link href="/newsletter">Newsletter</Link>
        </Button>
      </nav>
    </header>
  );
}
