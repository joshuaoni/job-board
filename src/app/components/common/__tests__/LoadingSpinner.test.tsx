import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { LoadingSpinner } from "../LoadingSpinner";

describe("LoadingSpinner", () => {
  it("should render with default size", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("w-8", "h-8"); // medium is default
  });

  it("should render with small size", () => {
    render(<LoadingSpinner size="small" />);
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("w-4", "h-4");
  });

  it("should render with large size", () => {
    render(<LoadingSpinner size="large" />);
    const spinner = screen.getByRole("status");
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass("w-12", "h-12");
  });

  it("should have correct ARIA attributes", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveAttribute("aria-label", "Loading...");
  });

  it("should have animation classes", () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("animate-spin");
  });

  it("should accept custom className", () => {
    render(<LoadingSpinner className="test-class" />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("test-class");
  });
});
