"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL parameters with defaults
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [jobType, setJobType] = useState(
    searchParams.get("job_type") || "full_time"
  );
  const [skills, setSkills] = useState(searchParams.get("skills") || "");

  const updateFilters = (updates: { [key: string]: string }) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "Select") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    // Preserve search_term if it exists
    const searchTerm = searchParams.get("search_term");
    if (searchTerm) {
      params.set("search_term", searchTerm);
    }

    router.push(`/?${params.toString()}`);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    updateFilters({ location: value });
  };

  const handleJobTypeChange = (value: string) => {
    setJobType(value);
    updateFilters({ job_type: value });
  };

  const handleSkillsChange = (value: string) => {
    setSkills(value);
    updateFilters({ skills: value });
  };

  // Set initial job type on mount if not already set
  useEffect(() => {
    if (!searchParams.get("job_type")) {
      updateFilters({ job_type: "full_time" });
    }
  }, []);

  return (
    <div className="app-filters w-full max-w-screen-lg flex flex-wrap gap-4 mt-4">
      <LocationFilter value={location} onChange={handleLocationChange} />
      <JobTypeFilter value={jobType} onChange={handleJobTypeChange} />
      <SkillsFilter value={skills} onChange={handleSkillsChange} />
    </div>
  );
};

// 📍 Location Filter (Text Input)
const LocationFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <input
      type="text"
      className="w-[218px] h-[44px] rounded-lg px-4 bg-[#EBEBEB] placeholder-black text-black flex items-center outline-none"
      placeholder="Location"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

// 🏢 Job Type Filter (Dropdown with Click Outside Detection)
const JobTypeFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const jobTypeOptions = [
    { key: "hybrid", label: "Hybrid" },
    { key: "full_time", label: "Full time" },
    { key: "part_time", label: "Part time" },
    { key: "internship", label: "Internship" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-[218px]">
      <div
        className="h-[44px] rounded-lg px-4 bg-[#EBEBEB] text-black flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {jobTypeOptions.find((option) => option.key === value)?.label ||
            "Select Job Type"}
        </span>
        <DropdownIconBox />
      </div>

      {isOpen && (
        <div className="absolute top-[48px] left-0 w-full bg-white text-black shadow-md rounded-lg z-10">
          {jobTypeOptions.map(({ key, label }) => (
            <div
              key={key}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                onChange(key); // Sends original key
                setIsOpen(false);
              }}
            >
              {label} {/* Displays formatted text */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 🔽 Dropdown Icon
const DropdownIconBox = () => {
  return (
    <div className="flex items-center">
      <Image src="/arrow-down.png" alt="dropdown" width={21} height={21} />
    </div>
  );
};

// 🛠️ Skills Filter (Text Input)
const SkillsFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <input
      type="text"
      className="w-[218px] h-[44px] rounded-lg px-4 placeholder-black bg-[#EBEBEB] text-black flex items-center outline-none"
      placeholder="Skills"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
