import type { Category } from "@/lib/stack-data";
import { StackItemRow } from "./StackItemRow";

interface CategoryCardProps {
  category: Category;
  selectedId: string | undefined;
  onToggle: (catId: string, itemId: string) => void;
}

export function CategoryCard({
  category,
  selectedId,
  onToggle,
}: CategoryCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}
      <header className="px-5 pb-3 pt-5">
        <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          {category.subtitle}
        </p>
        <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
          {category.title}
        </h2>
      </header>

      {/* Item list */}
      <div
        className="space-y-1 px-3 pb-3"
        role="list"
        aria-label={`${category.title} options`}
      >
        {category.items.map((item) => (
          <div key={item.id} role="listitem">
            <StackItemRow
              item={item}
              selected={selectedId === item.id}
              onToggle={() => onToggle(category.id, item.id)}
            />
          </div>
        ))}
      </div>
    </article>
  );
}
