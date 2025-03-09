export interface Job {
  id: string;
  job_title: string;
  job_type: string;
  required_skills: string;
  company_name: string;
  job_location_name: string;
  created_at: string;
  company_logo: string | null;
  languages: string;
  tags: string;
  company_description: string;
  job_description: string;
  educational_requirements: string;
  additional_benefits: string;
  years_of_experience_required: string;
  salary_range_min: number | null;
  salary_range_max: number | null;
  salary_currency: string | null;
  company_website: string | null;
}

export interface QuickInfoCardProps {
  title: string;
  value: string;
  className?: string;
}

export interface QuickInfoProps {
  job: Pick<
    Job,
    | "job_type"
    | "years_of_experience_required"
    | "salary_range_min"
    | "salary_range_max"
    | "salary_currency"
    | "job_location_name"
  >;
}

export interface TableProps {
  data: Job[];
  isLoading?: boolean;
}

export interface TableBodyProps {
  jobs: Job[];
}

export interface TableBodyRowProps {
  job: Job;
}

export interface ExtendedTableBodyRowProps extends TableBodyRowProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface TitleDetailsProps {
  company: string;
  location: string;
  title: string;
  timeAgo: string;
}

export interface JobHeaderProps {
  job: Pick<Job, "job_title" | "company_name" | "job_location_name">;
  timeAgo: string;
}

export interface TableSkeletonProps {
  rows?: number;
}

export interface ListWithCounterProps {
  items: string[];
  displayCount?: number;
  badgeClassName?: string;
}

export interface JobDetailsProps {
  params: {
    id: string;
  };
}

export interface JobSearchParams {
  search_term: string;
  job_type: string;
  location: string;
  skills: string[];
  page?: number;
  per_page?: number;
}

export interface SectionProps {
  title: string;
  children: React.ReactNode;
}
