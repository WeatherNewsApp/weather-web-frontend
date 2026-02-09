"use client";

import { useState, useEffect } from "react";

import { Icons } from "@/components/shea/icon";
import { useAreas } from "@/hooks/useAreas";

interface AreaComboBoxProps {
  selectedAreaId?: number;
  onChangeSelectedAreaId?: (areaId: number) => void;
  hasIcon?: boolean;
}

export const AreaComboBox = ({
  selectedAreaId,
  onChangeSelectedAreaId,
  hasIcon = false,
}: AreaComboBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { areas, isLoadingAreas } = useAreas();

  useEffect(() => {
    if (selectedAreaId && areas && areas.length > 0) {
      const selectedArea = areas.find((area) => area.id === selectedAreaId);
      if (selectedArea && query !== selectedArea.name) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setQuery(selectedArea.name);
      }
    }
  }, [selectedAreaId, areas, query]);

  const filteredAreas =
    areas?.filter((area) =>
      area.name.toLowerCase().includes(query.toLowerCase())
    ) || [];

  const handleAreaClick = (areaId: number) => {
    setIsOpen(false);
    const selectedArea = areas?.find((area) => area.id === areaId);
    if (selectedArea) {
      setQuery(selectedArea.name);
    }
    onChangeSelectedAreaId?.(areaId);
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <div className="w-full relative">
      <div className="w-full relative">
        {hasIcon && (
          <Icons.prefecture className="w-6 h-6 absolute top-1/2 left-4 -translate-y-1/2" />
        )}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onClick={handleInputClick}
          onFocus={() => setIsOpen(true)}
          placeholder="地域を検索"
          className={`w-full py-5 rounded-md bg-white focus:outline-none ${
            hasIcon ? "pl-12 pr-12" : "px-4 pr-12"
          }`}
        />
        <Icons.chevronDown className="w-6 h-6 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <ul className="absolute z-50 mt-2 w-full max-h-[280px] overflow-y-auto p-3 bg-white rounded-xs shadow-lg">
            {isLoadingAreas ? (
              <li className="py-3 px-2 pr-4">読み込み中</li>
            ) : filteredAreas.length > 0 ? (
              filteredAreas.map((area) => (
                <li
                  key={area.id}
                  className="px-4 py-2 pr-4 cursor-pointer hover:bg-gray-100 rounded-sm"
                  onClick={() => handleAreaClick(area.id)}
                >
                  {area.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">見つかりません</li>
            )}
          </ul>
        </>
      )}
    </div>
  );
};
