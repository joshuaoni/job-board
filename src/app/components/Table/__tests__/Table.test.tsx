import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Table } from "../Table";
import { formatJobType } from "@/app/utils/formatters";
import { Job } from "@/app/types/job";

// Mock next/navigation
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock formatJobType
jest.mock("@/app/utils/formatters", () => ({
  formatJobType: jest.fn((type) => `Formatted ${type}`),
}));

describe("Table", () => {
  const mockJobs: Job[] = [
    {
      id: "1",
      job_title: "Software Engineer",
      company_name: "Tech Corp",
      job_type: "full_time",
      job_location_name: "New York, NY",
      years_of_experience_required: "3-5 years",
      salary_range_min: 80000,
      salary_range_max: 120000,
      salary_currency: "USD",
      created_at: new Date("2024-01-15").toISOString(),
      company_logo: null,
      required_skills: "React, TypeScript",
      languages: "English",
      tags: "Remote",
      company_description: "A tech company",
      job_description: "Software engineering role",
      educational_requirements: "Bachelor's degree",
      additional_benefits: "Health insurance",
      company_website: null,
    },
    {
      id: "2",
      job_title: "Product Manager",
      company_name: "Product Co",
      job_type: "part_time",
      job_location_name: "Remote",
      years_of_experience_required: "5+ years",
      salary_range_min: 90000,
      salary_range_max: 150000,
      salary_currency: "USD",
      created_at: new Date("2024-01-14").toISOString(),
      company_logo: null,
      required_skills: "Product Management, Agile",
      languages: "English, Spanish",
      tags: "Tech, Product",
      company_description: "A product company",
      job_description: "Product management role",
      educational_requirements: "Master's degree",
      additional_benefits: "Stock options",
      company_website: null,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render table headers", () => {
    render(<Table data={mockJobs} />);

    expect(screen.getByText("Job Title")).toBeInTheDocument();
    expect(screen.getByText("Job Type")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Languages")).toBeInTheDocument();
    expect(screen.getByText("Tags")).toBeInTheDocument();
  });

  it("should render job rows", () => {
    render(<Table data={mockJobs} />);

    expect(screen.getAllByText("Software Engineer")[0]).toBeInTheDocument();
    expect(screen.getByText("Tech Corp")).toBeInTheDocument();
    expect(screen.getByText("Formatted full_time")).toBeInTheDocument();
    expect(screen.getByText("New York, NY")).toBeInTheDocument();

    expect(screen.getAllByText("Product Manager")[0]).toBeInTheDocument();
    expect(screen.getByText("Product Co")).toBeInTheDocument();
    expect(screen.getByText("Formatted part_time")).toBeInTheDocument();
    expect(screen.getAllByText("Remote")[0]).toBeInTheDocument();
  });

  it("should format job types", () => {
    render(<Table data={mockJobs} />);

    expect(formatJobType).toHaveBeenCalledWith("full_time");
    expect(formatJobType).toHaveBeenCalledWith("part_time");
  });

  it("should show loading skeleton when loading", () => {
    render(<Table data={[]} isLoading={true} />);

    const skeleton = screen.getByTestId("table-skeleton");
    expect(skeleton).toBeInTheDocument();
  });

  it("should show no jobs message when empty", () => {
    render(<Table data={[]} />);

    expect(
      screen.getByText("No jobs found matching your criteria")
    ).toBeInTheDocument();
  });

  it("should handle row click", () => {
    render(<Table data={mockJobs} />);

    const firstRow = screen.getAllByTestId("table-row")[0];
    fireEvent.click(firstRow);

    expect(mockPush).toHaveBeenCalledWith("/jobs/1");
  });

  it("should be responsive", () => {
    render(<Table data={mockJobs} />);

    const mobileView = screen.getAllByTestId("table-row-mobile")[0];
    expect(mobileView).toHaveClass("md:hidden");

    const desktopView = screen.getAllByTestId("table-row-desktop")[0];
    expect(desktopView).toHaveClass("hidden", "md:grid");
  });
});
