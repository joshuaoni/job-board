"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FilterProps, JOB_TYPE_OPTIONS } from "@/app/types/filters";
import { animations } from "@/app/utils/animations";

export const JobTypeFilter = ({ value, onChange }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = JOB_TYPE_OPTIONS.find(
    (option) => option.key === value
  );

  return (
    <div ref={dropdownRef} className="relative w-[218px]">
      <button
        type="button"
        className={`w-full h-[44px] rounded-lg px-4 bg-[#EBEBEB] text-black flex justify-between items-center hover:bg-[#E5E5E5] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
          isOpen ? "ring-2 ring-gray-300" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select job type"
      >
        <span>{selectedOption?.label || "Select Job Type"}</span>
        <Image
          src="/arrow-down.png"
          alt=""
          width={21}
          height={21}
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          priority={false}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <ul
          className={`absolute top-[48px] left-0 w-full bg-white text-black shadow-lg rounded-lg z-10 py-1 ${animations.scaleIn} origin-top`}
          role="listbox"
        >
          {JOB_TYPE_OPTIONS.map(({ key, label }) => (
            <li key={key} role="option" aria-selected={value === key}>
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors focus:outline-none focus:bg-gray-100"
                onClick={() => {
                  onChange(key);
                  setIsOpen(false);
                }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
