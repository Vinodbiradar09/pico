"use client";

import { useState, useCallback, useMemo } from "react";
import { CATEGORIES } from "@/lib/stack-data";
import type { Selections } from "@/lib/stack-utils";
import { getSelectedItem } from "@/lib/stack-utils";

export function useStackSelections() {
  const [selections, setSelections] = useState<Selections>({});

  const toggle = useCallback((catId: string, itemId: string) => {
    setSelections((prev) => {
      const next = { ...prev };
      if (next[catId] === itemId) {
        delete next[catId];
      } else {
        next[catId] = itemId;
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => setSelections({}), []);

  const hasAny = useMemo(
    () => Object.keys(selections).length > 0,
    [selections],
  );

  const selectedCount = useMemo(
    () => Object.keys(selections).length,
    [selections],
  );

  const selectedItems = useMemo(
    () =>
      CATEGORIES.map((cat) => ({
        cat,
        item: getSelectedItem(cat, selections),
      })).filter(
        (x): x is { cat: typeof x.cat; item: NonNullable<typeof x.item> } =>
          !!x.item,
      ),
    [selections],
  );

  return {
    selections,
    toggle,
    reset,
    hasAny,
    selectedCount,
    selectedItems,
  };
}
