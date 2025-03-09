"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LocationFilter } from "./LocationFilter";
import { JobTypeFilter } from "./JobTypeFilter";
import { SkillsFilter } from "./SkillsFilter";
import { FilterUpdateParams } from "@/app/types/filters";

export const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    job_type: searchParams.get("job_type") || "full_time",
    skills: searchParams.get("skills") || "",
  });

  const updateFilters = (updates: FilterUpdateParams) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "Select") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    const searchTerm = searchParams.get("search_term");
    if (searchTerm) {
      params.set("search_term", searchTerm);
    }

    router.push(`/?${params.toString()}`);
  };

  const handleFilterChange = (key: keyof typeof filters) => (value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateFilters({ [key]: value });
  };

  useEffect(() => {
    if (!searchParams.get("job_type")) {
      updateFilters({ job_type: "full_time" });
    }
  }, []);

  return (
    <div className="w-full max-w-screen-lg flex flex-wrap gap-4 mt-4">
      <LocationFilter
        value={filters.location}
        onChange={handleFilterChange("location")}
      />
      <JobTypeFilter
        value={filters.job_type}
        onChange={handleFilterChange("job_type")}
      />
      <SkillsFilter
        value={filters.skills}
        onChange={handleFilterChange("skills")}
      />
    </div>
  );
};
