"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getJobs } from "@/app/services/jobService";
import { getTimeAgo } from "@/app/utils/timeAgo";
import { Section } from "@/app/components/JobDetails/Section";
import { JobHeader } from "@/app/components/JobDetails/JobHeader";
import { QuickInfo } from "@/app/components/JobDetails/QuickInfo";
import { Job, JobDetailsProps } from "@/app/types/job";
import { animations } from "@/app/utils/animations";

const JOB_TYPES = ["full_time", "part_time", "hybrid", "internship"];

const JobDetailsSkeleton = () => (
  <div className="min-h-screen bg-white">
    <div className="max-w-screen-xl w-full mx-auto px-4 md:px-20 py-4 md:py-8 animate-pulse">
      <div className="w-24 h-8 bg-gray-100 rounded mb-4 md:mb-6" />

      <div className="bg-[#F9F9F9] rounded-[10px] p-4 md:p-6 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
          <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full bg-gray-100" />
          <div className="flex-grow">
            <div className="w-full md:w-2/3 h-6 md:h-7 bg-gray-100 rounded mb-3 md:mb-4" />
            <div className="flex flex-wrap items-center gap-2 md:gap-4">
              <div className="w-24 md:w-32 h-4 md:h-5 bg-gray-100 rounded" />
              <div className="hidden md:block w-1 h-1 bg-gray-100 rounded-full" />
              <div className="w-20 md:w-24 h-4 md:h-5 bg-gray-100 rounded" />
              <div className="hidden md:block w-1 h-1 bg-gray-100 rounded-full" />
              <div className="w-16 md:w-20 h-4 md:h-5 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-3 md:p-4 bg-gray-100 rounded-lg">
              <div className="w-16 md:w-20 h-3 md:h-4 bg-gray-200 rounded mb-2" />
              <div className="w-24 md:w-32 h-4 md:h-5 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-4 md:p-6 border border-gray-100"
          >
            <div className="w-32 md:w-40 h-5 md:h-6 bg-gray-100 rounded mb-3 md:mb-4" />
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-100 rounded" />
              <div className="w-5/6 h-4 bg-gray-100 rounded" />
              <div className="w-4/6 h-4 bg-gray-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ErrorState = () => (
  <div
    className={`min-h-screen bg-white flex items-center justify-center ${animations.fadeIn}`}
  >
    <div className="text-center px-4 md:px-0">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Job Not Found</h1>
      <Link href="/" className="text-blue-600 hover:underline">
        Back to Jobs
      </Link>
    </div>
  </div>
);

export default function JobDetails({ params }: JobDetailsProps) {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setIsLoading(true);
        setError(null);

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
        const foundJob = allJobs.find((j) => j.id === params.id);

        if (!foundJob) {
          throw new Error("Job not found");
        }

        setJob(foundJob);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch job");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [params.id]);

  if (isLoading) {
    return <JobDetailsSkeleton />;
  }

  if (error || !job) {
    return <ErrorState />;
  }

  const timeAgo = getTimeAgo(new Date(job.created_at));

  const formatSalaryRange = (
    min: number | null,
    max: number | null,
    currency: string | null
  ) => {
    if (!min && !max) return "Not specified";
    const curr = currency || "USD";
    if (min && max) {
      return `${curr} ${min.toLocaleString()} - ${max.toLocaleString()}`;
    }
    if (min) return `${curr} ${min.toLocaleString()}+`;
    if (max) return `Up to ${curr} ${max.toLocaleString()}`;
    return "Not specified";
  };

  return (
    <main className={`min-h-screen bg-white ${animations.fadeIn}`}>
      <div className="max-w-screen-xl w-full mx-auto px-4 md:px-20 py-4 md:py-8">
        <div className={animations.slideUp} style={{ animationDelay: "0.1s" }}>
          <JobHeader job={job} timeAgo={timeAgo} />
        </div>

        <div className="grid grid-cols-1 gap-4 md:gap-6">
          <div
            className={animations.slideUp}
            style={{ animationDelay: "0.2s" }}
          >
            <QuickInfo job={job} />
          </div>

          {job.company_description && (
            <div
              className={animations.slideUp}
              style={{ animationDelay: "0.3s" }}
            >
              <Section title="About the Company">
                <p className="text-gray-700 whitespace-pre-line text-sm md:text-base">
                  {job.company_description}
                </p>
              </Section>
            </div>
          )}

          <div
            className={animations.slideUp}
            style={{ animationDelay: "0.4s" }}
          >
            <Section title="Job Description">
              <p className="text-gray-700 whitespace-pre-line text-sm md:text-base">
                {job.job_description}
              </p>
            </Section>
          </div>

          <div
            className={animations.slideUp}
            style={{ animationDelay: "0.5s" }}
          >
            <Section title="Required Skills">
              <div className="flex flex-wrap gap-2">
                {job.required_skills.split(",").map((skill: string) => (
                  <span
                    key={skill}
                    className="px-2 md:px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </Section>
          </div>

          {job.educational_requirements && (
            <div
              className={animations.slideUp}
              style={{ animationDelay: "0.6s" }}
            >
              <Section title="Educational Requirements">
                <p className="text-gray-700 text-sm md:text-base">
                  {job.educational_requirements}
                </p>
              </Section>
            </div>
          )}

          {job.languages && (
            <div
              className={animations.slideUp}
              style={{ animationDelay: "0.7s" }}
            >
              <Section title="Languages">
                <div className="flex flex-wrap gap-2">
                  {job.languages.split(",").map((language: string) => (
                    <span
                      key={language}
                      className="px-2 md:px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm"
                    >
                      {language.trim()}
                    </span>
                  ))}
                </div>
              </Section>
            </div>
          )}

          {job.additional_benefits && (
            <div
              className={animations.slideUp}
              style={{ animationDelay: "0.8s" }}
            >
              <Section title="Additional Benefits">
                <p className="text-gray-700 whitespace-pre-line text-sm md:text-base">
                  {job.additional_benefits}
                </p>
              </Section>
            </div>
          )}

          <div
            className={animations.slideUp}
            style={{ animationDelay: "0.9s" }}
          >
            <Section title="Tags">
              <div className="flex flex-wrap gap-2">
                {job.tags.split(",").map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 md:px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs md:text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </Section>
          </div>

          <div
            className={`flex flex-col items-center mt-6 md:mt-8 ${animations.slideUp}`}
            style={{ animationDelay: "1s" }}
          >
            <button
              type="button"
              className="w-full md:w-auto bg-blue-600 text-white px-8 md:px-12 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg hover:shadow-xl"
            >
              Apply for this position
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
