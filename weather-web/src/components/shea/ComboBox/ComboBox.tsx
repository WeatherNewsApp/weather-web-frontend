"use client";
import { useState } from "react";
import { Icons } from "../icon";

interface ComboBoxProps<T> {
  items: T[];
  selectedId?: number | null;
  onSelect: (item: T) => void;
  getItemLabel: (item: T) => string;
  getItemKey: (item: T) => string | number;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

export const ComboBox = <T,>({
  items,
  selectedId,
  onSelect,
  getItemLabel,
  getItemKey,
  placeholder = "選択してください",
  searchPlaceholder = "検索...",
  emptyMessage = "該当する項目がありません",
}: ComboBoxProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter((item) =>
    getItemLabel(item).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="relative w-full">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-4 px-3 rounded-md bg-white"
        />
        <Icons.chevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-black" />
      </div>
      <div className="w-full flex flex-col gap-1 h-[280px] overflow-y-auto">
        {filteredItems.length === 0 ? (
          <p className="py-4">{emptyMessage}</p>
        ) : (
          filteredItems.map((item) => {
            const key = getItemKey(item);
            const isSelected = key === selectedId;

            return (
              <button
                key={key}
                onClick={() => onSelect(item)}
                className="w-full py-3 px-2 rounded-md bg-white text-black text-left"
              >
                {getItemLabel(item)}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
