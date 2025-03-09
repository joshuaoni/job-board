import Image from "next/image";
import { SearchBox } from "./SearchBox";

export const Header = () => {
  return (
    <div className="app-header w-full bg-white border-b border-gray-200 mx-auto py-4 md:py-0 md:h-[88px] flex items-center">
      <HeaderContainer />
    </div>
  );
};

const HeaderContainer = () => {
  return (
    <div className="app-header-container w-full flex items-center flex-col md:flex-row md:h-[48px] space-y-4 md:space-y-0 justify-between mx-auto">
      <LeftHeader />
      <RightHeader />
    </div>
  );
};

const LeftHeader = () => {
  return (
    <div className="app-left-header flex items-center relative w-full md:w-[340px] h-[42px]">
      <SearchBox />
    </div>
  );
};

const RightHeader = () => {
  return (
    <div className="app-right-header cursor-pointer h-full app-right-header w-full md:w-auto flex items-center justify-center md:justify-start space-x-4 bg-[#065844] text-white px-4 py-3 md:py-0 rounded-lg">
      <PlusIconBox />
      <CreateJobText />
    </div>
  );
};

const PlusIconBox = () => {
  return (
    <div className="w-5 h-5 flex items-center justify-center">
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
      <p className="font-inter font-bold text-xl md:text-[28px] leading-[125%] tracking-[0%] text-black">
        Job Board
      </p>
    </div>
  );
};
