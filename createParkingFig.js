const createSVG = (tag) => document.createElementNS("http://www.w3.org/2000/svg", tag);
  
const circle = (x, y, color, color2) => {
  const c = {};
  c.cx = x;
  c.cy = y;
  c.r = 6;
  c.stroke = color;
  c.fill = color2;
  c["stroke-width"] = 8;
  const ci = createSVG("circle");
  for (const name in c) {
    ci.setAttribute(name, c[name]);
  }
  return ci;
};
const createPattern = (ptn, color, color2) => {
  const svg = createSVG("svg");
  svg.setAttribute("width", 340);
  svg.setAttribute("height", 340);
  const ss = ptn.split("\n");
  for (let y = 0; y < ss.length; y++) {
    const s = ss[y];
    for (let x = 0; x < s.length; x++) {
      if (s[x] == "1") {
        const c = circle(x * 20 + 20, y * 20 + 20, color, color2);
        svg.appendChild(c);
      }
    }
  }
  svg.style.backgroundColor = "black";
  return svg;
};
  
const fig_full = `
0000001100001100
1000001100001100
1100111111111111
0110001100001100
0010001100001100
1000111111111111
1100000001100000
0110111111111111
0010110001100011
0000110001100011
0000110101101011
0010110101101011
0110110101101011
0110110111111011
1100110000000011
1000110000000111`;
  
const fig_space = `
0000000110000000
0000000110000000
1111111111111111
1111111111111111
1100110000110011
1100110000110011
0000110000110000
1111110000111111
1111110000111111
0000000000000000
0111111111111110
0111111111111110
0000000110000000
0000000110000000
1111111111111111
1111111111111111
`;

export const createParkingFig = (full) => {
  if (full) {
    return createPattern(fig_full.trim(), "#f00", "#faa");
  } else {
    return createPattern(fig_space.trim(), "#2c2", "#afa");
  }
};

