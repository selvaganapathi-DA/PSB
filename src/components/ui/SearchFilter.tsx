"use client";

import React from "react";
import { Search } from "lucide-react";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdown {
  name: string;
  placeholder: string;
  options: FilterOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

interface SearchFilterProps {
  searchText: string;
  onSearchChange: (text: string) => void;
  searchPlaceholder?: string;
  filters?: FilterDropdown[];
}

export function SearchFilter({
  searchText,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
}: SearchFilterProps) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-concrete-100 bg-white p-4 shadow-card sm:flex-row sm:items-center dark:border-white/5 dark:bg-blueprint-850">
      <div className="relative flex-1">
        <Search className="absolute left-3.5 top-1/2 h-[15px] w-[15px] -translate-y-1/2 text-concrete-300 dark:text-blueprint-400" />
        <input
          type="text"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-xl border border-concrete-100 bg-white py-2 pl-10 pr-4 text-[13px] text-concrete-900 outline-none transition-all placeholder:text-concrete-300 focus:border-signal-orange focus:ring-1 focus:ring-signal-orange dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-100 dark:placeholder:text-blueprint-400"
        />
      </div>

      {filters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter, idx) => (
            <select
              key={idx}
              value={filter.selectedValue}
              onChange={(e) => filter.onChange(e.target.value)}
              className="rounded-xl border border-concrete-100 bg-white px-3 py-2 text-[12.5px] font-medium text-concrete-600 outline-none transition-all hover:bg-concrete-50 dark:border-white/5 dark:bg-blueprint-900 dark:text-blueprint-200 dark:hover:bg-blueprint-800"
            >
              <option value="">{filter.placeholder}</option>
              {filter.options.map((opt, oIdx) => (
                <option key={oIdx} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}
        </div>
      )}
    </div>
  );
}
