"use client";

import { useState, useEffect, useRef } from "react";

import { useAreas } from "@/hooks/useAreas";
import { Icons } from "@/components/shea/icon";
import type { Area } from "@/types/area";

export const AreaComboBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [areas, setAreas] = useState<Area[]>([]);
  const [query, setQuery] = useState('');
  const [isLoadingAreas, setIsLoadingAreas] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !(wrapperRef.current as HTMLElement).contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpen =  async () => {
    setIsOpen(true);
    const { areas, isLoadingAreas } = useAreas();
    setAreas(areas || []);
    setIsLoadingAreas(isLoadingAreas);
  }

  return (
    <div className="w-full" ref={wrapperRef}>
      <div className="relative" onClick={handleOpen}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="地域を検索"
          className="bg-white rounded-md px-3 py-4 w-full"
        />
        <Icons.chevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6" />
      </div>
      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white shadow-lg border border-gray-200">
          {isLoadingAreas ? (
            <li className="px-4 py-2 text-gray-500">読み込み中...</li>
          ) : areas.length === 0 ? (
            <li className="px-4 py-2 text-gray-500">見つかりませんでした</li>
          ) : (
            areas.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  // onChange(item.id); // idを親に渡す
                  setQuery('');
                  setIsOpen(false);
                }}
                className="cursor-pointer px-4 py-2 hover:bg-blue-500 hover:text-white transition-colors"
              >
                {item.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}