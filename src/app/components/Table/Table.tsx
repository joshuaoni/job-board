"use client";

import { useRouter } from "next/navigation";
import { TableHeader } from "./TableHeader";
import { JobDetails } from "./JobDetails";
import { JobType, JobSkills, Languages, Tags } from "./TableCells";
import {
  TableProps,
  TableBodyProps,
  TableSkeletonProps,
  ExtendedTableBodyRowProps,
} from "@/app/types/job";
import { getTimeAgo } from "@/app/utils/timeAgo";
import { animations } from "@/app/utils/animations";

export const TableSkeleton = ({ rows = 5 }: TableSkeletonProps) => {
  return (
    <div className="w-full my-4" data-testid="table-skeleton">
      <div className="w-full h-[39.292px] rounded-[7.76px] bg-gray-200 mb-4 hidden md:block" />
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="w-full border-b border-gray-100 animate-pulse"
        >
          <div className="md:hidden p-4">
            <div className="space-y-3">
              <div className="w-3/4 h-5 bg-gray-100 rounded" />
              <div className="w-1/2 h-4 bg-gray-100 rounded" />
              <div className="flex gap-2">
                <div className="w-20 h-4 bg-gray-100 rounded" />
                <div className="w-24 h-4 bg-gray-100 rounded" />
              </div>
            </div>
          </div>

          <div className="hidden md:grid h-[51px] grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center">
            <div className="h-full rounded-[10px] p-1 pl-0">
              <div className="h-full w-full bg-gray-100 rounded-[6px]" />
            </div>
            <div className="h-5 bg-gray-100 rounded" />
            <div className="h-5 bg-gray-100 rounded" />
            <div className="h-5 bg-gray-100 rounded" />
            <div className="h-5 bg-gray-100 rounded" />
          </div>
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
    <div className={`w-full my-4 ${animations.fadeIn}`}>
      <TableHeader />
      <TableBody jobs={data} />
    </div>
  );
};

const TableBody = ({ jobs }: TableBodyProps) => {
  if (!jobs.length) {
    return (
      <div
        className={`w-full py-8 text-center text-gray-500 ${animations.fadeIn}`}
      >
        No jobs found matching your criteria
      </div>
    );
  }

  return (
    <div className="w-full divide-y divide-gray-100">
      {jobs.map((job, index) => (
        <TableBodyRow
          key={job.id}
          job={job}
          className={`${animations.slideUp}`}
          style={{ animationDelay: `${index * 0.05}s` }}
        />
      ))}
    </div>
  );
};

const TableBodyRow = ({
  job,
  className = "",
  style,
}: ExtendedTableBodyRowProps) => {
  const router = useRouter();
  const timeAgo = getTimeAgo(new Date(job.created_at));

  const handleClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`w-full hover:bg-gray-50 cursor-pointer transition-all duration-200 ${className}`}
      style={style}
      data-testid="table-row"
    >
      <div className="md:hidden p-4" data-testid="table-row-mobile">
        <div className="space-y-2">
          <h3 className="font-medium text-base text-black">{job.job_title}</h3>
          <p className="text-sm text-gray-600">{job.company_name}</p>
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            <span>{job.job_location_name}</span>
            <span>•</span>
            <span>{timeAgo}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
              {job.job_type}
            </span>
            {job.required_skills
              .split(",")
              .slice(0, 2)
              .map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                >
                  {skill.trim()}
                </span>
              ))}
            {job.required_skills.split(",").length > 2 && (
              <span className="text-xs text-gray-500">
                +{job.required_skills.split(",").length - 2} more
              </span>
            )}
          </div>
        </div>
      </div>
      <div
        className="hidden md:grid h-[51px] grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 items-center hover:scale-[1.01]"
        data-testid="table-row-desktop"
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
    </div>
  );
};
