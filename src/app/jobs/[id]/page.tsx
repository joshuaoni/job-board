import { getJobs } from "@/app/services/jobService";
import { getTimeAgo } from "@/app/utils/timeAgo";
import { Section } from "@/app/components/JobDetails/Section";
import { JobHeader } from "@/app/components/JobDetails/JobHeader";
import { QuickInfo } from "@/app/components/JobDetails/QuickInfo";
import { Job } from "@/app/types/job";
import Link from "next/link";

interface JobDetailsProps {
  params: {
    id: string;
  };
}

const JOB_TYPES = ["full_time", "part_time", "hybrid", "internship"];

export default async function JobDetails({ params }: JobDetailsProps) {
  const jobsPromises = JOB_TYPES.map((type) =>
    getJobs({
      search_term: "",
      job_type: type,
      location: "",
      skills: [],
    })
  );

  const jobsArrays = await Promise.all(jobsPromises);
  const allJobs = jobsArrays.flat();
  const job = allJobs.find((j: Job) => j.id === params.id);

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

  const timeAgo = getTimeAgo(new Date(job.created_at));

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-screen-xl w-full mx-auto px-20 py-8">
        <JobHeader job={job} timeAgo={timeAgo} />

        <div className="grid grid-cols-1 gap-6">
          <QuickInfo job={job} />

          {job.company_description && (
            <Section title="About the Company">
              <p className="text-gray-700 whitespace-pre-line">
                {job.company_description}
              </p>
            </Section>
          )}

          <Section title="Job Description">
            <p className="text-gray-700 whitespace-pre-line">
              {job.job_description}
            </p>
          </Section>

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

          {job.educational_requirements && (
            <Section title="Educational Requirements">
              <p className="text-gray-700">{job.educational_requirements}</p>
            </Section>
          )}

          {job.languages && (
            <Section title="Languages">
              <div className="flex flex-wrap gap-2">
                {job.languages.split(",").map((language: string) => (
                  <span
                    key={language}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {language.trim()}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {job.additional_benefits && (
            <Section title="Additional Benefits">
              <p className="text-gray-700 whitespace-pre-line">
                {job.additional_benefits}
              </p>
            </Section>
          )}

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
    </main>
  );
}
