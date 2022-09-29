export const transposeTable = (tbl) => {
  const newrows = [];
  const trs = tbl.querySelectorAll("tr");
  for (const tr of trs) {
    const ths = tr.querySelectorAll("th,td"); //tr.childNodes;
    for (let i = 0; i < ths.length; i++) {
      const th = ths[i];
      if (!newrows[i]) {
        newrows[i] = document.createElement("tr");
      }
      const cs = th.getAttribute("colspan");
      const rs = th.getAttribute("rowspan");
      th.setAttribute("colspan", rs);
      th.setAttribute("rowspan", cs);
      newrows[i].appendChild(th);
    }
  }
  tbl.innerHTML = "";
  for (const row of newrows) {
    tbl.appendChild(row);
  }
};

export const setAutoTransposeTable = (tbl, thw) => {
  let horizontal = true;
  if (innerWidth < thw) {
    transposeTable(tbl);
    horizontal = false;
  }
  addEventListener("resize", () => {
    if (horizontal && innerWidth < thw) {
      horizontal = false;
      transposeTable(tbl);
    } else if (!horizontal && innerWidth >= thw) {
      horizontal = true;
      transposeTable(tbl);
    }
  });
};
