import { formatJobType } from "../formatters";

describe("formatJobType", () => {
  it("should format job types correctly", () => {
    expect(formatJobType("full_time")).toBe("Full time");
    expect(formatJobType("part_time")).toBe("Part time");
    expect(formatJobType("hybrid")).toBe("Hybrid");
    expect(formatJobType("internship")).toBe("Internship");
  });

  it("should handle uppercase job types", () => {
    expect(formatJobType("FULL_TIME")).toBe("Full time");
    expect(formatJobType("PART_TIME")).toBe("Part time");
  });

  it("should return original value for unknown job types", () => {
    expect(formatJobType("contract")).toBe("contract");
    expect(formatJobType("freelance")).toBe("freelance");
  });

  it("should handle empty string", () => {
    expect(formatJobType("")).toBe("");
  });
});
