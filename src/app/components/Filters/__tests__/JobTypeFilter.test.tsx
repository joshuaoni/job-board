import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { JobTypeFilter } from "../JobTypeFilter";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: () => null,
    toString: () => "",
  }),
}));

describe("JobTypeFilter", () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("should render with default state", () => {
    render(<JobTypeFilter value="" onChange={mockOnChange} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Select Job Type")).toBeInTheDocument();
  });

  it("should show all job type options when clicked", () => {
    render(<JobTypeFilter value="" onChange={mockOnChange} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByRole("option", { name: "Hybrid" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Full time" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Part time" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Internship" })
    ).toBeInTheDocument();
  });

  it("should call onChange when an option is selected", () => {
    render(<JobTypeFilter value="" onChange={mockOnChange} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    const fullTimeOption = screen.getByRole("option", { name: "Full time" });
    const fullTimeButton = fullTimeOption.querySelector("button");
    fireEvent.click(fullTimeButton!);

    expect(mockOnChange).toHaveBeenCalledWith("full_time");
  });

  it("should show selected option", () => {
    render(<JobTypeFilter value="part_time" onChange={mockOnChange} />);

    expect(screen.getByRole("button")).toHaveTextContent("Part time");
  });

  it("should be accessible", () => {
    render(<JobTypeFilter value="" onChange={mockOnChange} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Select job type");
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
  });

  it("should close dropdown when clicking outside", () => {
    render(<JobTypeFilter value="" onChange={mockOnChange} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
