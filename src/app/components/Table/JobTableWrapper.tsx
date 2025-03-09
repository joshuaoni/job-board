"use client";

import useSWR from "swr";
import { Table } from "./Table";
import { getJobs } from "@/app/services/jobService";
import { PaginationContainer } from "../Pagination/Pagination";

export default function JobTableWrapper({
  searchParams,
}: {
  searchParams: any;
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 10;

  // Fetch jobs with SWR
  const {
    data: jobs = [],
    error,
    isLoading,
  } = useSWR(
    ["/api/jobs", searchParams],
    () =>
      getJobs({
        search_term: searchParams.search_term || "",
        job_type: searchParams.job_type?.toLowerCase() || "full_time",
        location: searchParams.location?.toLowerCase() || "",
        skills: searchParams.skills
          ? searchParams.skills.split(",").map((s: string) => s.trim())
          : [],
      }),
    { revalidateOnFocus: false } // Optional: Prevents re-fetching on tab switch
  );

  if (error) return <p className="text-red-500">Failed to load jobs.</p>;

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
