import { getTimeAgo } from "../timeAgo";

describe("getTimeAgo", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-01-15T12:00:00Z"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should return "Just now" for very recent dates', () => {
    const date = new Date("2024-01-15T11:59:30Z");
    expect(getTimeAgo(date)).toBe("Just now");
  });

  it("should return correct minutes ago", () => {
    const date = new Date("2024-01-15T11:58:00Z");
    expect(getTimeAgo(date)).toBe("2 minutes ago");
  });

  it("should return correct hours ago", () => {
    const date = new Date("2024-01-15T09:00:00Z");
    expect(getTimeAgo(date)).toBe("3 hours ago");
  });

  it("should return correct days ago", () => {
    const date = new Date("2024-01-13T12:00:00Z");
    expect(getTimeAgo(date)).toBe("2 days ago");
  });

  it("should return correct weeks ago", () => {
    const date = new Date("2024-01-01T12:00:00Z");
    expect(getTimeAgo(date)).toBe("2 weeks ago");
  });

  it("should return correct months ago", () => {
    const date = new Date("2023-11-15T12:00:00Z");
    expect(getTimeAgo(date)).toBe("2 months ago");
  });

  it("should return correct years ago", () => {
    const date = new Date("2022-01-15T12:00:00Z");
    expect(getTimeAgo(date)).toBe("2 years ago");
  });

  it("should use singular form for single units", () => {
    const date = new Date("2024-01-14T12:00:00Z");
    expect(getTimeAgo(date)).toBe("1 day ago");
  });
});
