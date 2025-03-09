import Image from "next/image";
import { SearchBox } from "./SearchBox";

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
  return (
    <div className="app-left-header relative w-[340px] h-[42px]">
      <SearchBox />
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
