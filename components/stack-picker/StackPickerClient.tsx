"use client";

import { CATEGORIES } from "@/lib/stack-data";
import { useStackSelections } from "@/hooks/useStackSelections";
import { CategoryCard } from "./CategoryCard";
import { BottomBar } from "./BottomBar";

export function StackPickerClient() {
  const { selections, toggle, reset, hasAny } = useStackSelections();

  return (
    <>
      {/* Category grid */}
      <main
        className="mx-auto w-full max-w-7xl flex-1 px-6 pb-40 lg:px-8"
        aria-label="Tech stack categories"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              selectedId={selections[cat.id]}
              onToggle={toggle}
            />
          ))}
        </div>
      </main>

      {/* Sticky bottom bar */}
      <BottomBar selections={selections} hasAny={hasAny} onReset={reset} />
    </>
  );
}
