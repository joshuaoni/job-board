import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { SearchBox } from "../SearchBox";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    toString: jest.fn(),
  }),
}));

describe("SearchBox", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it("should render with placeholder text", () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search for jobs");
    expect(input).toBeInTheDocument();
  });

  it("should render with default value", () => {
    render(<SearchBox defaultValue="developer" onSearch={mockOnSearch} />);
    const input = screen.getByDisplayValue("developer");
    expect(input).toBeInTheDocument();
  });

  it("should call onSearch when search button is clicked", async () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search for jobs");
    const searchButton = screen.getByRole("button", { name: "Search jobs" });

    fireEvent.change(input, { target: { value: "developer" } });
    await act(async () => {
      fireEvent.click(searchButton);
    });

    expect(mockOnSearch).toHaveBeenCalledWith("developer");
  });

  it("should call onSearch when Enter is pressed", async () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search for jobs");

    await act(async () => {
      fireEvent.change(input, { target: { value: "developer" } });
    });

    await act(async () => {
      fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });
    });

    expect(mockOnSearch).toHaveBeenCalledWith("developer");
  });

  it("should show loading state while searching", async () => {
    mockOnSearch.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );
    render(<SearchBox onSearch={mockOnSearch} />);

    const searchButton = screen.getByRole("button", { name: "Search jobs" });
    await act(async () => {
      fireEvent.click(searchButton);
    });

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(searchButton).toBeDisabled();
  });

  it("should trim search term before searching", async () => {
    render(<SearchBox onSearch={mockOnSearch} />);
    const input = screen.getByPlaceholderText("Search for jobs");

    await act(async () => {
      fireEvent.change(input, { target: { value: "  developer  " } });
    });

    await act(async () => {
      fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });
    });

    expect(mockOnSearch).toHaveBeenCalledWith("developer");
  });

  it("should be accessible", () => {
    render(<SearchBox onSearch={mockOnSearch} />);

    expect(screen.getByRole("search")).toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toHaveAttribute(
      "aria-label",
      "Search jobs"
    );
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Search jobs"
    );
  });

  it("should match snapshot with default state", () => {
    const { container } = render(<SearchBox onSearch={mockOnSearch} />);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with default value", () => {
    const { container } = render(
      <SearchBox defaultValue="developer" onSearch={mockOnSearch} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot in loading state", async () => {
    mockOnSearch.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );
    const { container } = render(<SearchBox onSearch={mockOnSearch} />);

    const searchButton = screen.getByRole("button", { name: "Search jobs" });
    await act(async () => {
      fireEvent.click(searchButton);
    });

    expect(container).toMatchSnapshot();
  });
});
