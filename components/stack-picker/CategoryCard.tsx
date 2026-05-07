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
    <article className="rounded-2xl border border-zinc-200/80 bg-white shadow-[0_1px_3px_0_rgb(0,0,0,0.04)] transition-shadow hover:shadow-[0_4px_12px_0_rgb(0,0,0,0.07)] dark:border-zinc-800/60 dark:bg-zinc-900 dark:shadow-none">
      <header className="px-5 pb-3 pt-5">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
          {category.subtitle}
        </p>
        <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
          {category.title}
        </h2>
      </header>

      <div className="h-px mx-5 bg-zinc-100 dark:bg-zinc-800/60" />

      <div
        className="space-y-0.5 px-3 pb-3 pt-2"
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
