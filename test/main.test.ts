import {
  opositeColor,
  luminance,
  contrast,
  checkAccessibility,
} from "../index";

describe("oposite color", () => {
  it("correct return value", () => {
    expect(opositeColor("#AFCBE5")).toBe("#50341A");
  });

  it("works with no hash symbol", () => {
    expect(opositeColor("AFCBE5")).toBe("#50341A");
  });

  it("Shorter syntax", () => {
    expect(opositeColor("FFF")).toBe("#000");
  });
});

describe("luminance", () => {
  it("with hash", () => {
    expect(luminance("#AFCBE5")).toBe(0.57);
  });
  it("without hash", () => {
    expect(luminance("AFCBE5")).toBe(0.57);
  });
  it("better precission", () => {
    expect(luminance("AFCBE5", 10)).toBe(0.5748297472);
  });
  it("MAX", () => {
    expect(luminance("FFFFFF")).toBe(1);
  });
  it("MIN", () => {
    expect(luminance("000000")).toBe(0);
  });
});

describe("contrast", () => {
  it("white and black", () => {
    const Lwhite = luminance("FFFFFF");
    const Lblack = luminance("000000");

    expect(contrast(Lwhite, Lblack)).toBe(21);
  });

  it("skyblue and shitbrown", () => {
    const skyblue = luminance("#AFCBE5", 10);
    const shitbrown = luminance("#50341A", 10);

    expect(contrast(skyblue, shitbrown)).toBeCloseTo(6.76, 1);
  });
});

describe("accessibility", () => {
  it("main characters: shit and sky", () => {
    const skyblue = luminance("#AFCBE5", 10);
    const shitbrown = luminance("#50341A", 10);
    const res = contrast(skyblue, shitbrown);

    expect(checkAccessibility(res)).toEqual({
      WCAG_AA: {
        NormalText: true,
        LargeText: true,
        Components: true,
      },
      WCAG_AAA: {
        NormalText: false,
        LargeText: true,
      },
    });
  });

  it("black and white", () => {
    const Lwhite = luminance("FFFFFF");
    const Lblack = luminance("000000");
    const res = contrast(Lwhite, Lblack);

    expect(checkAccessibility(res)).toEqual({
      WCAG_AA: {
        NormalText: true,
        LargeText: true,
        Components: true,
      },
      WCAG_AAA: {
        NormalText: true,
        LargeText: true,
      },
    });
  });
});
