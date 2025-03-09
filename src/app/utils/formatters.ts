export const formatJobType = (jobType: string): string => {
  const formattedTypes: { [key: string]: string } = {
    full_time: "Full time",
    part_time: "Part time",
    hybrid: "Hybrid",
    internship: "Internship",
  };

  return formattedTypes[jobType.toLowerCase()] || jobType;
};
