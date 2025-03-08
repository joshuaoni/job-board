import Image from "next/image";
import Link from "next/link";
import { getJobs } from "@/app/services/jobService";

interface Job {
  id: string;
  reference: string;
  job_title: string;
  job_type: string;
  job_description: string;
  required_skills: string;
  company_name: string;
  company_description: string;
  company_website?: string;
  company_logo: string | null;
  job_location_name: string;
  educational_requirements: string;
  years_of_experience_required: string;
  additional_benefits: string;
  salary_range_min?: number;
  salary_range_max?: number;
  filter_out_salary_range: boolean;
  tags: string;
  created_at: string;
  updated_at: string;
  status: string;
  languages: string | null;
  country_of_residence: string | null;
  total_applicants: number;
}

interface JobDetailsProps {
  params: {
    id: string;
  };
}

export default async function JobDetails({ params }: JobDetailsProps) {
  const jobs = await getJobs({
    search_term: "",
    job_type: "",
    location: "",
    skills: [],
  });

  const job = jobs.find((j: Job) => j.id === params.id);

  if (!job) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-screen-xl w-full mx-auto px-20 py-8">
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

        {/* Header Section */}
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
            <div>
              <h1 className="text-2xl font-bold text-[#333333] mb-2">
                {job.job_title}
              </h1>
              <div className="flex items-center gap-4 text-[#8F8F8F]">
                <span>{job.company_name}</span>
                <span>•</span>
                <span>{job.job_location_name}</span>
                <span>•</span>
                <span>{job.job_type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Main Details */}
          <div className="col-span-2 space-y-8">
            {/* Job Description */}
            <Section title="Job Description">
              <p className="whitespace-pre-line">{job.job_description}</p>
            </Section>

            {/* Required Skills */}
            <Section title="Required Skills">
              <div className="flex flex-wrap gap-2">
                {job.required_skills.split(",").map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </Section>

            {/* Educational Requirements */}
            <Section title="Educational Requirements">
              <p>{job.educational_requirements}</p>
            </Section>

            {/* Experience Required */}
            <Section title="Experience Required">
              <p>{job.years_of_experience_required}</p>
            </Section>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-8">
            {/* Company Details */}
            <Section title="About Company">
              <p>{job.company_description}</p>
              {job.company_website && (
                <a
                  href={job.company_website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 inline-block"
                >
                  Visit Website
                </a>
              )}
            </Section>

            {/* Additional Benefits */}
            <Section title="Additional Benefits">
              <p className="whitespace-pre-line">{job.additional_benefits}</p>
            </Section>

            {/* Salary Range */}
            {!job.filter_out_salary_range &&
              job.salary_range_min &&
              job.salary_range_max && (
                <Section title="Salary Range">
                  <p>
                    ${job.salary_range_min.toLocaleString()} - $
                    {job.salary_range_max.toLocaleString()} per year
                  </p>
                </Section>
              )}

            {/* Tags */}
            <Section title="Tags">
              <div className="flex flex-wrap gap-2">
                {job.tags.split(",").map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100">
      <h2 className="text-lg font-bold mb-4 text-[#333333]">{title}</h2>
      <div className="text-[#4A4A4A]">{children}</div>
    </div>
  );
};
