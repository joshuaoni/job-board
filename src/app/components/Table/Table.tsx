"use client";

import { useRouter } from "next/navigation";
import { TableHeader } from "./TableHeader";
import { JobDetails } from "./JobDetails";
import { JobType, JobSkills, Languages, Tags } from "./TableCells";
import { TableProps, TableBodyProps, TableBodyRowProps } from "@/app/types/job";
import { getTimeAgo } from "@/app/utils/timeAgo";

export const Table = ({ data = [] }: TableProps) => {
  return (
    <div className="w-full my-4">
      <TableHeader />
      <TableBody jobs={data} />
    </div>
  );
};

const TableBody = ({ jobs }: TableBodyProps) => {
  if (!jobs.length) {
    return (
      <div className="w-full py-8 text-center text-gray-500">
        No jobs found matching your criteria
      </div>
    );
  }

  return (
    <div className="w-full">
      {jobs.map((job) => (
        <TableBodyRow key={job.id} job={job} />
      ))}
    </div>
  );
};

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
      <JobDetails
        company={job.company_name}
        location={job.job_location_name}
        title={job.job_title}
        timeAgo={timeAgo}
      />
      <JobType type={job.job_type} />
      <JobSkills skills={job.required_skills} />
      <Languages languages={job.languages || "Not specified"} />
      <Tags tags={job.tags || "Not specified"} />
    </div>
  );
};
