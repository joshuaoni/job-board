import { Filters } from "./components/Filters/Filters";
import { Header, TitleContainer } from "./components/Header/Header";
import JobTableWrapper from "./components/Table/JobTableWrapper";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-screen-xl w-full mx-auto px-4 md:px-20">
        <Header />
        <TitleContainer />
        <Filters />
        <JobTableWrapper searchParams={searchParams} />
      </div>
    </main>
  );
}
