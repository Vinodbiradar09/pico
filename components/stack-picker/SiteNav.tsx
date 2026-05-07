import Link from "next/link";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center border-b border-zinc-100 bg-white/95 px-6 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-950/95 lg:px-8">
      <Link
        href="/"
        className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-zinc-900 shadow-sm dark:bg-zinc-100">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="2"
              y="2"
              width="4"
              height="4"
              rx="1"
              fill="currentColor"
              className="text-white dark:text-zinc-900"
            />
            <rect
              x="8"
              y="2"
              width="4"
              height="4"
              rx="1"
              fill="currentColor"
              className="text-white dark:text-zinc-900"
            />
            <rect
              x="2"
              y="8"
              width="4"
              height="4"
              rx="1"
              fill="currentColor"
              className="text-white dark:text-zinc-900"
            />
            <rect
              x="8"
              y="8"
              width="4"
              height="4"
              rx="1"
              fill="currentColor"
              className="text-white dark:text-zinc-900"
            />
          </svg>
        </div>
        <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Pico
        </span>
      </Link>

      <div className="ml-3 hidden items-center sm:flex">
        <span className="text-zinc-200 dark:text-zinc-700">/</span>
        <span className="ml-3 text-sm text-zinc-400 dark:text-zinc-500">
          Stack Picker
        </span>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-1">
        <a
          href="https://github.com/Vinodbiradar09/pico"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View on GitHub"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </div>
    </header>
  );
}
