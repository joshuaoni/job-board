"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getJobs } from "@/app/services/jobService";
import { getTimeAgo } from "@/app/utils/timeAgo";
import { Section } from "@/app/components/JobDetails/Section";
import { JobHeader } from "@/app/components/JobDetails/JobHeader";
import { QuickInfo } from "@/app/components/JobDetails/QuickInfo";
import { Job } from "@/app/types/job";
import { LoadingSpinner } from "@/app/components/common/LoadingSpinner";

interface JobDetailsProps {
  params: {
    id: string;
  };
}

const JOB_TYPES = ["full_time", "part_time", "hybrid", "internship"];

const JobDetailsSkeleton = () => (
  <div className="min-h-screen bg-white">
    <div className="max-w-screen-xl w-full mx-auto px-20 py-8 animate-pulse">
      {/* Back button skeleton */}
      <div className="w-24 h-8 bg-gray-100 rounded mb-6" />

      {/* Header section skeleton */}
      <div className="bg-[#F9F9F9] rounded-[10px] p-6 mb-8">
        <div className="flex items-start gap-6">
          <div className="w-[80px] h-[80px] rounded-full bg-gray-100" />
          <div className="flex-grow">
            <div className="w-2/3 h-7 bg-gray-100 rounded mb-4" />
            <div className="flex items-center gap-4">
              <div className="w-32 h-5 bg-gray-100 rounded" />
              <div className="w-1 h-1 bg-gray-100 rounded-full" />
              <div className="w-24 h-5 bg-gray-100 rounded" />
              <div className="w-1 h-1 bg-gray-100 rounded-full" />
              <div className="w-20 h-5 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Content section skeleton */}
      <div className="grid grid-cols-1 gap-6">
        {/* Quick info cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 bg-gray-100 rounded-lg">
              <div className="w-20 h-4 bg-gray-200 rounded mb-2" />
              <div className="w-32 h-5 bg-gray-200 rounded" />
            </div>
          ))}
        </div>

        {/* Content sections */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg p-6 border border-gray-100"
          >
            <div className="w-40 h-6 bg-gray-100 rounded mb-4" />
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
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
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

        // Fetch jobs for each job type
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
