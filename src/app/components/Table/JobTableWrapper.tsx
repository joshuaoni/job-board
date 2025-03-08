"use client";

import { useEffect, useState } from "react";
import { Table } from "./Table";
import { getJobs } from "@/app/services/jobService";
import { PaginationContainer } from "../Pagination/Pagination";

export default function JobTableWrapper({
  searchParams,
}: {
  searchParams: any;
}) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const page = Number(searchParams.page) || 1;
  const pageSize = 10;

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      const jobsData = await getJobs({
        search_term: searchParams.search_term || "",
        job_type: searchParams.job_type?.toLowerCase() || "full_time",
        location: searchParams.location?.toLowerCase() || "",
        skills: searchParams.skills
          ? searchParams.skills.split(",").map((s: string) => s.trim())
          : [],
      });
      setJobs(jobsData);
      setIsLoading(false);
    };

    fetchJobs();
  }, [searchParams]); // Re-fetch when searchParams change

  // Pagination Calculation
  const totalItems = jobs.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageItems = jobs.slice(startIndex, endIndex);

  return (
    <>
      <Table data={currentPageItems} isLoading={isLoading} />
      <PaginationContainer
        currentPage={page}
        totalPages={totalPages}
        hasNextPage={endIndex < totalItems}
        hasPrevPage={page > 1}
      />
    </>
  );
}
