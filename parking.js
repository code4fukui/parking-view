import { fetchViaProxy } from "./fetchViaProxy.js";
import { CSV } from "https://js.sabae.cc/CSV.js";
import { XML } from "https://js.sabae.cc/XML.js";

const fetchParkingInfo = async () => {
  const url = "https://data.odp.jig.jp/rdf/jp/fukui/sabae/201.rdf";
  const xml = await fetchViaProxy(url);
  const json = XML.toJSON(xml);
  return json;
};

const fetchParkingData = async () => {
  const url = "http://mixsoda.io:2048/testtest.csv?from=-6000000";
  //const url = "http://mixsoda.io:2048/testtest.csv?from=-6";
  const csv = await fetchViaProxy(url);
  const data = CSV.toJSON(CSV.decode(csv));
  //console.log(data);
  const iccids = [
    "8981040000001207740",
    "8981040000001207757",
  ];
  const flg_space = [
    0,
    1,
  ];
  const getLast = (iccid, def) => {
    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i].iccid == iccid) {
        return parseInt(data[i].data, 10);
      }
    }
    return def;
  };
  const res = [];
  for (let i = 0; i < iccids.length; i++) {
    const iccid = iccids[i];
    const last = getLast(iccid, flg_space[i]);
    res.push(last != flg_space[i]);
  }
  return res;
};

export const updateParking = async (parking) => {
  const pdata = await fetchParkingData();
  for (let i = 0; i < pdata.length; i++) {
    parking[i].full = pdata[i];
  }
  return parking;
};

export const getParking = async () => {
  const names = ["嚮陽会館前駐車場", "ふれあい広場駐車場"];
  const info = await fetchParkingInfo();
  const parking = [];
  for (const name of names) {
    const p = info["rdf:RDF"]["jrrk:ParkingFacility"].find(p => p["rdfs:label"]["#text"] == name);
    parking.push({
      name,
      address: p["jrrk:address"]["#text"],
      price: p["schema:price"]["#text"],
      capacity: p["jrrk:capacity"]["#text"],
      open: "24時間",
    });
  }
  return parking;
};
