"use client";
import type { StackItem } from "@/lib/stack-data";
import { useState } from "react";

interface TechIconProps {
  item: StackItem;
  size?: number;
}

export function TechIcon({ item, size = 22 }: TechIconProps) {
  const [error, setError] = useState(false);

  if (!item.iconUrl || error) {
    return (
      <div
        className="flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase text-zinc-400"
        aria-hidden="true"
      >
        {item.name.slice(0, 2)}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.iconUrl}
      alt={item.name}
      width={size}
      height={size}
      className="object-contain"
      onError={() => setError(true)}
    />
  );
}
