import Image from "next/image";
import Link from "next/link";

interface JobHeaderProps {
  job: {
    company_logo: string | null;
    company_name: string;
    job_title: string;
    job_location_name: string;
    company_website: string | null;
  };
  timeAgo: string;
}

export const JobHeader = ({ job, timeAgo }: JobHeaderProps) => {
  return (
    <>
      <Link
        href="/"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <Image
          src="/arrow-left.png"
          alt="Back"
          width={24}
          height={24}
          className="mr-2"
        />
        Back to Jobs
      </Link>

      <div className="bg-[#F9F9F9] rounded-[10px] p-6 mb-8">
        <div className="flex items-start gap-6">
          <div className="w-[80px] h-[80px] rounded-full overflow-hidden bg-white flex items-center justify-center">
            <Image
              src={job.company_logo || "/figma.png"}
              alt={job.company_name}
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
          <div className="flex-grow">
            <h1 className="text-2xl font-bold text-[#333333] mb-2">
              {job.job_title}
            </h1>
            <div className="flex items-center gap-4 text-[#8F8F8F] mb-4">
              <span>{job.company_name}</span>
              <span>•</span>
              <span>{job.job_location_name}</span>
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
            {job.company_website && (
              <a
                href={job.company_website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Company Website
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
