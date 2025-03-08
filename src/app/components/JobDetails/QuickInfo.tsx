import { QuickInfoCard } from "./QuickInfoCard";

interface QuickInfoProps {
  job: {
    job_type: string;
    years_of_experience_required: string;
    salary_range_min: number | null;
    salary_range_max: number | null;
    salary_currency: string | null;
    job_location_name: string;
  };
}

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

export const QuickInfo = ({ job }: QuickInfoProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <QuickInfoCard
        title="Job Type"
        value={job.job_type}
        className="bg-gray-100"
      />
      <QuickInfoCard
        title="Experience"
        value={job.years_of_experience_required || "Not specified"}
        className="bg-gray-100"
      />
      <QuickInfoCard
        title="Salary Range"
        value={formatSalaryRange(
          job.salary_range_min,
          job.salary_range_max,
          job.salary_currency
        )}
        className="bg-gray-100"
      />
      <QuickInfoCard
        title="Location"
        value={job.job_location_name}
        className="bg-gray-100"
      />
    </div>
  );
};
