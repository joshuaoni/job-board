import Image from "next/image";
import { TitleDetailsProps } from "@/app/types/job";

const TextElement = ({
  text,
  textColor,
  fontWeight,
}: {
  text: string;
  textColor: string;
  fontWeight: string;
}) => {
  return (
    <div className="w-[217px] h-[18px] flex items-center">
      <p
        style={{ color: textColor }}
        className={`font-inter ${fontWeight} text-[12px] leading-[15px] tracking-[0%] truncate`}
      >
        {text}
      </p>
    </div>
  );
};

const Details = ({ company, location, title, timeAgo }: TitleDetailsProps) => {
  return (
    <div className="w-[217px] h-[37px] gap-[4px] flex flex-col">
      <TextElement text={title} textColor="#333333" fontWeight="font-medium" />
      <TextElement
        text={`${company}, ${location} - ${timeAgo}`}
        textColor="#8F8F8F"
        fontWeight="font-normal"
      />
    </div>
  );
};

export const JobDetails = ({
  company,
  location,
  title,
  timeAgo,
}: TitleDetailsProps) => {
  return (
    <div className="h-[51px] rounded-[10px] p-[4px] pl-0 gap-[10px] flex items-center">
      <div className="w-full h-full bg-[#F9F9F9] rounded-[10px] pl-[8px] pr-[8px] gap-[10px] flex">
        <div className="flex items-center justify-center w-[38px] h-[38px]">
          <Image
            src="/figma.png"
            alt={`${company} logo`}
            width={38}
            height={38}
            className="rounded-full object-cover"
          />
        </div>
        <Details
          company={company}
          location={location}
          title={title}
          timeAgo={timeAgo}
        />
      </div>
    </div>
  );
};
