"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Job {
  id: string;
  job_title: string;
  job_type: string;
  required_skills: string;
  company_name: string;
  job_location_name: string;
  created_at: string;
  company_logo: string | null;
  languages: string;
  tags: string;
}

interface TableProps {
  data: Job[];
}

export const Table = ({ data = [] }: TableProps) => {
  return (
    <div className="app-table w-full my-4">
      <TableHeading />
      <TableBody jobs={data} />
    </div>
  );
};

const TableHeading = () => {
  return (
    <div className="app-table-heading w-full h-[39.292px] rounded-[7.76px] pt-[11.65px] pb-[11.65px] bg-[#D6D6D6] gap-4 grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center mb-4">
      <TextElement text="Job Title" />
      <TextElement text="Job Type" />
      <TextElement text="Skills" />
      <TableHeadingBox element={<TextElement2 text="Languages" />} />
      <TableHeadingBox element={<TextElement2 text="Tags" />} />
    </div>
  );
};

const TextElement = ({ text }: { text: string }) => {
  return (
    <div
      // style={{ width: `${width}px` }}
      className="h-[16px] first:pl-4 text-[#898989] flex items-center justify-start"
    >
      <p className="font-inter font-bold text-[13.59px] leading-[100%] tracking-[5%]">
        {text}
      </p>
    </div>
  );
};

const TableHeadingBox = ({ element }: { element: React.ReactNode }) => {
  return <div className="  h-[16px] ">{element}</div>;
};

const TextElement2 = ({ text }: { text: string }) => {
  return (
    <div
      // style={{ width: `${width}px`, left: `${left}px` }}
      className="h-[16px] text-[#898989]  flex items-center"
    >
      <p className="font-urbanist font-bold text-[13.59px] leading-[100%] tracking-[5%]">
        {text}
      </p>
    </div>
  );
};

interface TableBodyProps {
  jobs: Job[];
}

const TableBody = ({ jobs }: TableBodyProps) => {
  if (!jobs.length) {
    return (
      <div className="w-full py-8 text-center text-gray-500">
        No jobs found matching your criteria
      </div>
    );
  }
  return (
    <div className="app-table-body w-full">
      {jobs.map((job) => (
        <TableBodyRow key={job.id} job={job} />
      ))}
    </div>
  );
};

interface TableBodyRowProps {
  job: Job;
}

const TableBodyRow = ({ job }: TableBodyRowProps) => {
  const router = useRouter();
  const timeAgo = getTimeAgo(new Date(job.created_at));

  const handleClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full h-[51px] border-b border-white grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <TitleDetails
        company={job.company_name}
        location={job.job_location_name}
        title={job.job_title}
        timeAgo={timeAgo}
      />
      <JobType type={job.job_type} />
      <JobSkills skills={job.required_skills} />
      <LanguagesBox width="152" languages={job.languages || "Not specified"} />
      <TagsBox width="139" tags={job.tags || "Not specified"} />
    </div>
  );
};

const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, seconds] of Object.entries(intervals)) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
    }
  }

  return "Just now";
};

const JobType = ({ type }: { type: string }) => {
  return (
    <div className="w-full h-[19px]  flex items-center justify-start">
      <p className="font-inter font-normal text-[16px] leading-[100%] tracking-[5%] text-black text-center">
        {type}
      </p>
    </div>
  );
};

const JobSkills = ({ skills }: { skills: string }) => {
  const skillsList = skills.split(",").map((skill) => skill.trim());
  const displaySkill = skillsList[0];
  const remainingCount = skillsList.length - 1;

  return (
    <div className="w-full flex justify-start items-center gap-2 overflow-hidden">
      <div className="flex items-center">
        <span className="text-sm text-black truncate" title={skills}>
          {displaySkill}
        </span>
        {remainingCount > 0 && (
          <span
            className="ml-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600"
            title={skillsList.slice(1).join(", ")}
          >
            +{remainingCount}
          </span>
        )}
      </div>
    </div>
  );
};

const LanguagesBox = ({
  width,
  languages,
}: {
  width: string;
  languages: string;
}) => {
  const languageList = languages.split(",").map((lang) => lang.trim());
  const displayLanguage = languageList[0];
  const remainingCount = languageList.length - 1;

  return (
    <div className="w-full flex justify-start items-center overflow-hidden">
      <div className="flex items-center">
        <span className="text-sm text-black truncate" title={languages}>
          {displayLanguage}
        </span>
        {remainingCount > 0 && (
          <span
            className="ml-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium text-gray-600"
            title={languageList.slice(1).join(", ")}
          >
            +{remainingCount}
          </span>
        )}
      </div>
    </div>
  );
};

const TagsBox = ({ width, tags }: { width: string; tags: string }) => {
  const tagsList = tags.split(",").map((tag) => tag.trim());
  const displayTag = tagsList[0];
  const remainingCount = tagsList.length - 1;

  return (
    <div className="w-full overflow-hidden">
      <div className="flex justify-start items-center">
        <span className="text-sm text-black truncate" title={tags}>
          {displayTag}
        </span>
        {remainingCount > 0 && (
          <span
            className="ml-1 px-2 py-0.5 bg-blue-50 rounded-full text-xs font-medium text-blue-600"
            title={tagsList.slice(1).join(", ")}
          >
            +{remainingCount}
          </span>
        )}
      </div>
    </div>
  );
};

const TitleDetails = ({
  company,
  location,
  title,
  timeAgo,
}: {
  company: string;
  location: string;
  title: string;
  timeAgo: string;
}) => {
  return (
    <div className="app-title-details h-[51px] rounded-[10px] p-[4px] pl-0 gap-[10px] flex items-center">
      <GappedContainer
        company={company}
        location={location}
        title={title}
        timeAgo={timeAgo}
      />
    </div>
  );
};

const GappedContainer = ({
  company,
  location,
  title,
  timeAgo,
}: {
  company: string;
  location: string;
  title: string;
  timeAgo: string;
}) => {
  return (
    <div className="w-full h-full bg-[#F9F9F9] rounded-[10px] pl-[8px] pr-[8px]  gap-[10px] flex">
      <IconBox />
      <Details
        company={company}
        location={location}
        title={title}
        timeAgo={timeAgo}
      />
    </div>
  );
};

const IconBox = () => {
  return (
    <div className="flex items-center justify-center w-[38px] h-[38px]">
      <Image
        src={"/figma.png"}
        alt="company logo"
        width={38}
        height={38}
        className="rounded-full object-cover"
      />
    </div>
  );
};

const Details = ({
  company,
  location,
  title,
  timeAgo,
}: {
  company: string;
  location: string;
  title: string;
  timeAgo: string;
}) => {
  return (
    <div className="w-[217px] h-[37px] gap-[4px] flex flex-col">
      <TextElement6 text={title} textColor="#333333" fontWeight="font-medium" />
      <TextElement6
        text={`${company}, ${location} - ${timeAgo}`}
        textColor="#8F8F8F"
        fontWeight="font-normal"
      />
    </div>
  );
};

const TextElement6 = ({
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
        className={`font-inter ${fontWeight} text-[12px] leading-[15px] tracking-[0%]`}
      >
        {text}
      </p>
    </div>
  );
};
