"use client";

import type { StackItem } from "@/lib/stack-data";
import { TechIcon } from "./TechIcon";
import { Check } from "lucide-react";

interface StackItemRowProps {
  item: StackItem;
  selected: boolean;
  onToggle: () => void;
}

export function StackItemRow({ item, selected, onToggle }: StackItemRowProps) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={selected}
      className={`
        group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left
        transition-all duration-100 focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-blue-500 focus-visible:ring-offset-2
        ${
          selected
            ? "border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/40"
            : "border-transparent hover:border-zinc-200 hover:bg-zinc-50 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/50"
        }
      `}
    >
      <div
        className={`
          flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border
          ${
            selected
              ? "border-blue-200 bg-white dark:border-blue-900 dark:bg-zinc-900"
              : "border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800"
          }
        `}
      >
        <TechIcon item={item} size={22} />
      </div>

      <span
        className={`flex-1 text-sm font-medium leading-none ${
          selected
            ? "text-blue-700 dark:text-blue-400"
            : "text-zinc-800 dark:text-zinc-200"
        }`}
      >
        {item.name}
      </span>

      <div
        className={`
          flex h-4.5 w-4.5 shrink-0 items-center justify-center
          rounded-full bg-blue-600 transition-all duration-150
          ${selected ? "scale-100 opacity-100" : "scale-50 opacity-0"}
        `}
        aria-hidden="true"
      >
        <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />
      </div>
    </button>
  );
}
