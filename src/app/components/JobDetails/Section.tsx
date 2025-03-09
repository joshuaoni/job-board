import { SectionProps } from "@/app/types/job";

export const Section = ({ title, children }: SectionProps) => {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100">
      <h2 className="text-lg font-bold mb-4 text-[#333333]">{title}</h2>
      <div className="text-[#4A4A4A]">{children}</div>
    </div>
  );
};
