import { animations, keyframes } from "../animations";

describe("animations", () => {
  it("should have fadeIn animation", () => {
    expect(animations.fadeIn).toBeDefined();
    expect(animations.fadeIn).toContain("animate-");
  });

  it("should have slideUp animation", () => {
    expect(animations.slideUp).toBeDefined();
    expect(animations.slideUp).toContain("animate-");
  });

  it("should have scaleIn animation", () => {
    expect(animations.scaleIn).toBeDefined();
    expect(animations.scaleIn).toContain("animate-");
  });

  it("should have popIn animation", () => {
    expect(animations.popIn).toBeDefined();
    expect(animations.popIn).toContain("animate-");
  });
});

describe("keyframes", () => {
  it("should have fadeIn keyframes", () => {
    expect(keyframes.fadeIn).toBeDefined();
    expect(keyframes.fadeIn).toHaveProperty("0%");
    expect(keyframes.fadeIn).toHaveProperty("100%");
    expect(keyframes.fadeIn["0%"]).toHaveProperty("opacity", "0");
  });

  it("should have slideUp keyframes", () => {
    expect(keyframes.slideUp).toBeDefined();
    expect(keyframes.slideUp).toHaveProperty("0%");
    expect(keyframes.slideUp).toHaveProperty("100%");
    expect(keyframes.slideUp["0%"]).toHaveProperty("transform");
  });

  it("should have scaleIn keyframes", () => {
    expect(keyframes.scaleIn).toBeDefined();
    expect(keyframes.scaleIn).toHaveProperty("0%");
    expect(keyframes.scaleIn).toHaveProperty("100%");
    expect(keyframes.scaleIn["0%"]).toHaveProperty("transform");
  });

  it("should have popIn keyframes", () => {
    expect(keyframes.popIn).toBeDefined();
    expect(keyframes.popIn).toHaveProperty("0%");
    expect(keyframes.popIn).toHaveProperty("100%");
    expect(keyframes.popIn["0%"]).toHaveProperty("transform");
  });
});
