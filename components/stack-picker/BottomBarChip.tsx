import type { Category, StackItem } from "@/lib/stack-data";
import { TechIcon } from "./TechIcon";

interface BottomBarChipProps {
  category: Category;
  item: StackItem | undefined;
}

export function BottomBarChip({ category, item }: BottomBarChipProps) {
  return (
    <div
      className={`
        flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5
        transition-opacity duration-200
        ${
          item
            ? "border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800"
            : "pointer-events-none border-zinc-100 bg-transparent opacity-35 dark:border-zinc-800"
        }
      `}
    >
      {item && (
        <div className="flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
          <TechIcon item={item} size={14} />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-[9px] font-semibold uppercase tracking-[.06em] text-zinc-400 dark:text-zinc-500">
          {category.title}
        </p>
        <p className="truncate text-xs font-medium leading-none text-zinc-800 dark:text-zinc-200">
          {item ? item.name : "–"}
        </p>
      </div>
    </div>
  );
}
