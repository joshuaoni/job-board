import { getJobs } from "./services/jobService";
import { Filters } from "./components/Filters/Filters";
import { Header, TitleContainer } from "./components/Header/Header";
import { Table } from "./components/Table/Table";
import { PaginationContainer } from "./components/Pagination/Pagination";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const page = Number(searchParams.page) || 1;
  const pageSize = 10;

  // Server-side fetch with search params
  const jobs = await getJobs({
    search_term: searchParams.search_term || "",
    job_type: searchParams.job_type?.toLowerCase() || "full_time",
    location: searchParams.location?.toLowerCase() || "",
    skills: searchParams.skills
      ? searchParams.skills.split(",").map((s) => s.trim())
      : [],
  });

  // Calculate pagination
  const totalItems = jobs.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageItems = jobs.slice(startIndex, endIndex);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-screen-xl w-full mx-auto px-20">
        <Header />
        <TitleContainer />
        <Filters />
        <Table data={currentPageItems} />
        <PaginationContainer
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={endIndex < totalItems}
          hasPrevPage={page > 1}
        />
      </div>
    </main>
  );
}
