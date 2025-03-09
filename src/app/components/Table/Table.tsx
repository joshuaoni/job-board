"use client";

import { useRouter } from "next/navigation";
import { TableHeader } from "./TableHeader";
import { JobDetails } from "./JobDetails";
import { JobType, JobSkills, Languages, Tags } from "./TableCells";
import { TableProps, TableBodyProps, TableBodyRowProps } from "@/app/types/job";
import { getTimeAgo } from "@/app/utils/timeAgo";
import { LoadingSpinner } from "../common/LoadingSpinner";

interface TableSkeletonProps {
  rows?: number;
}

const TableSkeleton = ({ rows = 5 }: TableSkeletonProps) => {
  return (
    <div className="w-full my-4 animate-pulse">
      <div className="w-full h-[39.292px] rounded-[7.76px] bg-gray-200 mb-4" />
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="w-full h-[51px] border-b border-white grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center"
        >
          <div className="h-full rounded-[10px] p-1 pl-0">
            <div className="h-full w-full bg-gray-100 rounded-[6px]" />
          </div>
          <div className="h-5 bg-gray-100 rounded" />
          <div className="h-5 bg-gray-100 rounded" />
          <div className="h-5 bg-gray-100 rounded" />
          <div className="h-5 bg-gray-100 rounded" />
        </div>
      ))}
    </div>
  );
};

export const Table = ({ data = [], isLoading = false }: TableProps) => {
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="app-table-container w-full my-4">
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
