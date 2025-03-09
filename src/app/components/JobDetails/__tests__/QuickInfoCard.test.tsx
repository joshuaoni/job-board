import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { QuickInfoCard } from "../QuickInfoCard";

describe("QuickInfoCard", () => {
  it("should render title and value", () => {
    render(<QuickInfoCard title="Job Type" value="Full time" />);

    const title = screen.getByText("Job Type");
    const value = screen.getByText("Full time");

    expect(title).toBeInTheDocument();
    expect(value).toBeInTheDocument();
  });

  it("should render with custom className", () => {
    render(
      <QuickInfoCard
        title="Job Type"
        value="Full time"
        className="custom-class"
      />
    );

    const container = screen.getByTestId("quick-info-card");
    expect(container).toHaveClass("custom-class");
  });

  it("should render with default styles", () => {
    render(<QuickInfoCard title="Job Type" value="Full time" />);

    const container = screen.getByTestId("quick-info-card");
    expect(container).toHaveClass("p-4", "rounded-lg");
  });

  it("should render title with correct styles", () => {
    render(<QuickInfoCard title="Job Type" value="Full time" />);

    const title = screen.getByText("Job Type");
    expect(title).toHaveClass(
      "text-sm",
      "font-medium",
      "text-gray-500",
      "mb-1"
    );
  });

  it("should render value with correct styles", () => {
    render(<QuickInfoCard title="Job Type" value="Full time" />);

    const value = screen.getByText("Full time");
    expect(value).toHaveClass("text-base", "font-semibold", "text-gray-900");
  });
});
