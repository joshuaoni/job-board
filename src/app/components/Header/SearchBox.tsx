"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

const SearchBox = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search_term") || ""
  );

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm.trim()) {
      params.set("search_term", searchTerm.trim());
    } else {
      params.delete("search_term");
    }
    router.push(`/?${params.toString()}`);
  }, [searchTerm, searchParams, router]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Background Box (Now part of the parent, not absolute) */}
      <div className="bg-[#F0F0F0] rounded-full w-full h-10 flex items-center px-12">
        {/* Search Icon with Click Handler */}
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer"
          onClick={handleSearch}
        >
          <SearchIconBox />
        </div>

        {/* Input Field - Ensures visibility */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for jobs"
          className="w-full bg-transparent focus:outline-none text-sm text-gray-700 z-10"
        />
      </div>
    </div>
  );
};

const SearchIconBox = () => {
  return (
    <div className="w-6 h-6">
      <Image src="/search-normal.png" alt="search" width={24} height={24} />
    </div>
  );
};
export default SearchBox;
