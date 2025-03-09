"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { SearchBoxProps } from "@/app/types/header";

const SearchIcon = () => (
  <div className="w-6 h-6">
    <Image
      src="/search-normal.png"
      alt=""
      width={24}
      height={24}
      aria-hidden="true"
    />
  </div>
);

export const SearchBox = ({ defaultValue = "", onSearch }: SearchBoxProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search_term") || defaultValue
  );
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback(async () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm.trim()) {
      params.set("search_term", searchTerm.trim());
    } else {
      params.delete("search_term");
    }

    setIsSearching(true);
    try {
      if (onSearch) {
        await onSearch(searchTerm.trim());
      }
      router.push(`/?${params.toString()}`);
    } finally {
      setIsSearching(false);
    }
  }, [searchTerm, searchParams, router, onSearch]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-md" role="search">
      <div className="bg-[#F0F0F0] rounded-full w-full h-10 flex items-center px-12">
        <button
          type="button"
          className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full disabled:opacity-50"
          onClick={handleSearch}
          disabled={isSearching}
          aria-label="Search jobs"
        >
          {isSearching ? (
            <LoadingSpinner size="small" className="text-gray-600" />
          ) : (
            <SearchIcon />
          )}
        </button>

        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Search for jobs"
          className="w-full bg-transparent focus:outline-none text-sm text-gray-700 z-10 disabled:opacity-50"
          aria-label="Search jobs"
          disabled={isSearching}
        />
      </div>
    </div>
  );
};
