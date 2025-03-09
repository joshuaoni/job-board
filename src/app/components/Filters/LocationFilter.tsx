import { FilterProps } from "@/app/types/filters";

export const LocationFilter = ({ value, onChange }: FilterProps) => {
  return (
    <input
      type="text"
      className="w-[218px] h-[44px] rounded-lg px-4 bg-[#EBEBEB] placeholder-black text-black flex items-center outline-none focus:ring-2 focus:ring-gray-300 transition-shadow"
      placeholder="Location"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter by location"
    />
  );
};
