const TableHeadCell = ({ text }: { text: string }) => {
  return (
    <div className="h-[16px] first:pl-4 text-[#898989] flex items-center justify-start">
      <p className="font-inter font-bold text-[13.59px] leading-[100%] tracking-[5%]">
        {text}
      </p>
    </div>
  );
};

export const TableHeader = () => {
  return (
    <div className="w-full h-[39.292px] rounded-[7.76px] pt-[11.65px] pb-[11.65px] bg-[#D6D6D6] gap-4 grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center mb-4">
      <TableHeadCell text="Job Title" />
      <TableHeadCell text="Job Type" />
      <TableHeadCell text="Skills" />
      <TableHeadCell text="Languages" />
      <TableHeadCell text="Tags" />
    </div>
  );
};
