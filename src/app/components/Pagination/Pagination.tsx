"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const PaginationContainer = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) => {
  return (
    <div className="app-pagination h-[24px] w-full pb-20 gap-[10px] flex justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
    </div>
  );
};

const Pagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    console.log("ran");
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="w-[102px] h-[24px] left-[819px] gap-[8px] flex">
      <ArrowElement text={currentPage.toString()} />
      <ArrowContainer
        onPrevClick={() => hasPrevPage && handlePageChange(currentPage - 1)}
        onNextClick={() => hasNextPage && handlePageChange(currentPage + 1)}
        hasPrevPage={hasPrevPage}
        hasNextPage={hasNextPage}
      />
      <ArrowElement text={totalPages.toString()} />
    </div>
  );
};

const ArrowElement = ({ text }: { text: string }) => {
  return (
    <div className="w-[6px] h-[22px] flex items-center justify-center">
      <p className="font-outfit font-normal text-[16px] leading-[140%] tracking-[0%] text-[#898989]">
        {text}
      </p>
    </div>
  );
};

interface ArrowContainerProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

const ArrowContainer = ({
  onPrevClick,
  onNextClick,
  hasPrevPage,
  hasNextPage,
}: ArrowContainerProps) => {
  return (
    <div className="w-[71px] h-[24px] gap-[24px] flex">
      <button
        onClick={onPrevClick}
        className={`${
          !hasPrevPage ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={!hasPrevPage}
      >
        <IconBox icon="/arrow-left.png" />
      </button>
      <button
        onClick={onNextClick}
        className={`${
          !hasNextPage ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={!hasNextPage}
      >
        <IconBox icon="/arrow-right.png" />
      </button>
    </div>
  );
};

const IconBox = ({ icon }: { icon: string }) => {
  return (
    <div className="w-[24px] h-[24px]">
      <Image src={icon} alt="icon" width={24} height={24} />
    </div>
  );
};
