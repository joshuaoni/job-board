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
