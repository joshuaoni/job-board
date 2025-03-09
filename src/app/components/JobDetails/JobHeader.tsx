import Link from "next/link";
import Image from "next/image";
import { Job } from "@/app/types/job";

interface JobHeaderProps {
  job: Job;
  timeAgo: string;
}

export const JobHeader = ({ job, timeAgo }: JobHeaderProps) => {
  return (
    <div className="mb-6 md:mb-8">
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-4 md:mb-6 text-sm md:text-base"
      >
        <Image
          src="/arrow-left.png"
          alt="Back"
          width={20}
          height={20}
          className="mr-2 w-4 h-4 md:w-5 md:h-5"
        />
        Back to Jobs
      </Link>

      <div className="bg-[#F9F9F9] rounded-[10px] p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
          <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] relative rounded-full overflow-hidden bg-gray-100">
            <Image
              src={"/figma.png"}
              alt={job.company_name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-grow">
            <h1 className="text-xl md:text-2xl text-black font-bold mb-2 md:mb-3">
              {job.job_title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm md:text-base text-gray-600">
              <span>{job.company_name}</span>
              <span className="hidden md:inline-block w-1 h-1 bg-gray-400 rounded-full" />
              <span>{job.job_location_name}</span>
              <span className="hidden md:inline-block w-1 h-1 bg-gray-400 rounded-full" />
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
