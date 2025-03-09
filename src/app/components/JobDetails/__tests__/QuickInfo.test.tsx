import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QuickInfo } from "../QuickInfo";
import { formatJobType } from "@/app/utils/formatters";

jest.mock("@/app/utils/formatters", () => ({
  formatJobType: jest.fn((type) => `Formatted ${type}`),
}));

describe("QuickInfo", () => {
  const mockJob = {
    job_type: "full_time",
    years_of_experience_required: "3-5 years",
    salary_range_min: 80000,
    salary_range_max: 120000,
    salary_currency: "USD",
    job_location_name: "New York, NY",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all job information cards", () => {
    render(<QuickInfo job={mockJob} />);

    expect(screen.getByText("Job Type")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Salary Range")).toBeInTheDocument();
  });

  it("should format job type using formatter", () => {
    render(<QuickInfo job={mockJob} />);

    expect(formatJobType).toHaveBeenCalledWith("full_time");
    expect(screen.getByText("Formatted full_time")).toBeInTheDocument();
  });

  it("should display location correctly", () => {
    render(<QuickInfo job={mockJob} />);

    expect(screen.getByText("New York, NY")).toBeInTheDocument();
  });

  it("should display experience level correctly", () => {
    render(<QuickInfo job={mockJob} />);

    expect(screen.getByText("3-5 years")).toBeInTheDocument();
  });

  it("should display salary range correctly", () => {
    render(<QuickInfo job={mockJob} />);

    expect(screen.getByText("USD 80,000 - 120,000")).toBeInTheDocument();
  });

  it("should handle missing salary information", () => {
    const jobWithoutSalary = {
      ...mockJob,
      salary_range_min: null,
      salary_range_max: null,
      salary_currency: null,
    };
    render(<QuickInfo job={jobWithoutSalary} />);

    expect(screen.getByText("Not specified")).toBeInTheDocument();
  });

  it("should handle missing experience information", () => {
    const jobWithoutExperience = {
      ...mockJob,
      years_of_experience_required: "",
    };
    render(<QuickInfo job={jobWithoutExperience} />);

    expect(screen.getByText("Not specified")).toBeInTheDocument();
  });

  it("should render with grid layout", () => {
    render(<QuickInfo job={mockJob} />);

    const container = screen.getByTestId("quick-info-container");
    expect(container).toHaveClass(
      "grid",
      "grid-cols-2",
      "md:grid-cols-4",
      "gap-4"
    );
  });
});
