export type JobTypeOption = {
  key: string;
  label: string;
};

export interface FilterProps {
  value: string;
  onChange: (value: string) => void;
}

export interface FilterUpdateParams {
  [key: string]: string;
}

export const JOB_TYPE_OPTIONS: JobTypeOption[] = [
  { key: "hybrid", label: "Hybrid" },
  { key: "full_time", label: "Full time" },
  { key: "part_time", label: "Part time" },
  { key: "internship", label: "Internship" },
];
