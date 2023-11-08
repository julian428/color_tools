export function opositeColor(color: string) {
  let oposite = [];
  for (let c of color) {
    const currentOposite = (15 - parseInt(c, 16)).toString(16);
    if (currentOposite === "NaN") continue;
    oposite.push(currentOposite);
  }
  return "#" + oposite.join("").toUpperCase();
}

export function luminance(color: string, precssion = 2) {
  if (color.startsWith("#")) {
    color = color.replace("#", "");
  }

  //? divide the hex value into 3 equal parts.
  const parts = color.match(/.{1,2}/g);
  if (!parts || parts.length !== 3) return NaN;

  const [R, G, B] = parts.map((part) => {
    const s = parseInt(part, 16) / 255;
    if (s <= 0.04045) {
      return s / 12.92;
    } else {
      return Math.pow((s + 0.055) / 1.055, 2.4);
    }
  });
  const res = 0.2126 * (R || 0) + 0.7152 * (G || 0) + 0.0722 * (B || 0);

  return parseFloat(res.toFixed(precssion));
}

export function contrast(l0: number, l1: number, precission = 2) {
  return parseFloat(((l0 + 0.05) / (l1 + 0.05)).toFixed(precission));
}

export function checkAccessibility(contrast: number): {
  WCAG_AA: {
    NormalText: boolean;
    LargeText: boolean;
    Components: boolean;
  };
  WCAG_AAA: {
    NormalText: boolean;
    LargeText: boolean;
  };
} {
  let wcag = {
    WCAG_AA: {
      NormalText: false,
      LargeText: false,
      Components: false,
    },
    WCAG_AAA: {
      NormalText: false,
      LargeText: false,
    },
  };

  if (contrast >= 3) {
    wcag.WCAG_AA.LargeText = true;
    wcag.WCAG_AA.Components = true;
  }
  if (contrast >= 4.5) {
    wcag.WCAG_AA.NormalText = true;
    wcag.WCAG_AAA.LargeText = true;
  }
  if (contrast >= 7) {
    wcag.WCAG_AAA.NormalText = true;
  }

  return wcag;
}
