"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchBox from "./SearchBox";

export const Header = () => {
  return (
    <div className="app-header w-full h-[88px] bg-white border-b border-gray-200 mx-auto flex items-center">
      <HeaderContainer />
    </div>
  );
};

const HeaderContainer = () => {
  return (
    <div className="w-full h-[48px] flex justify-between mx-auto">
      <LeftHeader />
      <RightHeader />
    </div>
  );
};

const LeftHeader = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchTerm) {
      searchParams.set("search", searchTerm);
    } else {
      searchParams.delete("search");
    }
    router.push(`/?${searchParams.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="app-left-header relative w-[340px] h-[42px]">
      <SearchBox />
      <SearchIconContainer onSearch={handleSearch} />
      <input
        type="text"
        className="absolute inset-0 bg-transparent pl-12 pr-4 outline-none placeholder-gray-700"
        placeholder="Search for jobs"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

const SearchIconContainer = ({ onSearch }: { onSearch: () => void }) => {
  return (
    <div
      className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center cursor-pointer"
      onClick={onSearch}
    >
      <SearchIconBox />
    </div>
  );
};

const SearchBox = () => {
  return <div className="absolute inset-0 bg-[#F0F0F0] rounded-full z-0" />;
};

const SearchIconBox = () => {
  return (
    <div className="w-6 h-6 bg-[#898989]">
      <Image src="/search-normal.png" alt="search" width={24} height={24} />
    </div>
  );
};

const RightHeader = () => {
  return (
    <div className="app-right-header flex items-center space-x-4 bg-[#065844] text-white px-4  rounded-lg">
      <PlusIconBox />
      <CreateJobText />
    </div>
  );
};

const PlusIconBox = () => {
  return (
    <div className="w-5 h-5">
      <Image src="/Icon.png" alt="plus" width={20} height={20} />
    </div>
  );
};

const CreateJobText = () => {
  return <p className="text-white font-bold text-sm">Create New Job Post</p>;
};

export const TitleContainer = () => {
  return (
    <div className="app-header-title w-full h-[35px] mx-auto flex justify-between my-4">
      <TitleText />
    </div>
  );
};

const TitleText = () => {
  return (
    <div className="h-[35px] flex items-center justify-center">
      <p className="font-inter font-bold text-[28px] leading-[125%] tracking-[0%] text-black">
        Job Board
      </p>
    </div>
  );
};
