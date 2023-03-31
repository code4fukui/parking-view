# parking-view
 
https://code4fukui.github.io/parking-view/

## Usage

```JavaScript
import { getParking, updateParking } from "https://code4fukui.github.io/parking-view/parking.js";

const parking = await getParking();

const update = async () => {
  await updateParking(parking);
  console.log(parking);
  setTimeout(show, 60 * 1000);
};
update();
```

## opendata

- [駐車場(福井県鯖江市) - ParkingFacility - オープンデータプラットフォーム | データカタログサイト](https://ckan.odp.jig.jp/ja/dataset/jp-fukui-sabae-953-odp/resource/f4c10f77-cd9e-471e-a2c5-67198371604d)
