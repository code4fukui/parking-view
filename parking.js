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
  const url = "http://mixsoda.io:2048/testtest_b.csv?from=-6000000";
  //const url = "http://mixsoda.io:2048/testtest.csv?from=-6000000";
  //const url = "http://mixsoda.io:2048/testtest.csv?from=-6";
  const csv = await fetchViaProxy(url);
  const data = CSV.toJSON(CSV.decode(csv));
  //console.log(data);
  const iccids = [
    //"8981040000001207740",
    //"8981040000001207757",
    "8981040000001404255",
    "8981040000001404248",
  ];
  const flg_space = [
    //0,
    1,
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
  console.log(info);
  const parking = [];
  for (const name of names) {
    const p = info["rdf:RDF"]["jrrk:ParkingFacility"].find(p => p["rdfs:label"]["#text"] == name);
    const get = (name) => {
      const rdf = p["ic:地理座標"]["rdf:Description"];
      if (rdf) {
        return rdf["ic:" + name] ? rdf["ic:" + name]["#text"] : rdf["ipa:" + name]["#text"];
      }
      const rdf2 = p["ipa:地理座標"]["rdf:Description"];
      if (rdf2) {
        return rdf2["ic:" + name] ? rdf2["ic:" + name]["#text"] : rdf2["ipa:" + name]["#text"];
      }
      return null;
    }
    parking.push({
      name,
      address: p["jrrk:address"]["#text"],
      price: p["schema:price"]["#text"],
      capacity: p["jrrk:capacity"]["#text"],
      open: "24時間",
      lat: get("緯度"),
      lng: get("経度"),
    });
  }
  return parking;
};
