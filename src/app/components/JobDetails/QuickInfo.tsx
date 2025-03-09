import { formatJobType } from "@/app/utils/formatters";

interface QuickInfoCardProps {
  title: string;
  value: string;
  className?: string;
}

const QuickInfoCard = ({
  title,
  value,
  className = "",
}: QuickInfoCardProps) => {
  return (
    <div className={`p-4 rounded-lg ${className}`}>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-base font-semibold text-gray-900">{value}</p>
    </div>
  );
};

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
    <div
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
      data-testid="quick-info-container"
    >
      <QuickInfoCard
        title="Job Type"
        value={formatJobType(job.job_type)}
        className="bg-gray-100"
      />
      <QuickInfoCard
        title="Experience"
        value={job.years_of_experience_required || "Not specified"}
        className="bg-gray-100"
      />
      <QuickInfoCard
        title="Salary Range"
        value={
          job.salary_range_min && job.salary_range_max && job.salary_currency
            ? `${
                job.salary_currency
              } ${job.salary_range_min.toLocaleString()} - ${job.salary_range_max.toLocaleString()}`
            : "Not specified"
        }
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
