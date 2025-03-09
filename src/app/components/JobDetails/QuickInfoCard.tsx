import { QuickInfoCardProps } from "@/app/types/job";

export const QuickInfoCard = ({
  title,
  value,
  className = "",
}: QuickInfoCardProps) => {
  return (
    <div
      className={`p-4 rounded-lg ${className}`}
      data-testid="quick-info-card"
    >
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <p className="text-base font-semibold text-gray-900">{value}</p>
    </div>
  );
};
