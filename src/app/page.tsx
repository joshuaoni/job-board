"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getJobs } from "./services/jobService";
import { Filters } from "./components/Filters/Filters";
import { Header, TitleContainer } from "./components/Header/Header";
import { Table } from "./components/Table/Table";
import { PaginationContainer } from "./components/Pagination/Pagination";
import { Job } from "./types/job";

export default function Home() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getJobs({
          search_term: searchParams.get("search_term") || "",
          job_type: searchParams.get("job_type") || "full_time",
          location: searchParams.get("location") || "",
          skills: searchParams.get("skills")?.split(",") || [],
        });
        setJobs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch jobs");
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-screen-xl w-full mx-auto px-20">
        <Header />
        <TitleContainer />
        <Filters />
        {error ? (
          <div className="w-full py-8 text-center text-red-500">{error}</div>
        ) : (
          <Table data={jobs} isLoading={isLoading} />
        )}
      </div>
    </main>
  );
}
