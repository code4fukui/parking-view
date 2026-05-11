# parking-view

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A real-time parking availability viewer for municipal parking lots in Sabae City, Fukui, Japan.

## Live Application

- **[鯖江市営駐車場満車・空車状況 (Sabae City Parking Availability)](https://code4fukui.github.io/parking-view/)**

## Features

-   Displays real-time availability ("満車" - Full / "空車" - Vacant).
-   Status is indicated with colored labels: red for "Full" and blue for "Vacant".
-   Automatically refreshes data every 60 seconds in the browser.
-   Presents information in a transposed table layout for mobile-friendly viewing.
-   Built with vanilla JavaScript, requiring no external frameworks.

## Usage as a JavaScript Module

The core logic can be imported and used in other projects.

```javascript
import { getParking, updateParking } from "https://code4fukui.github.io/parking-view/parking.js";

// Get initial parking lot information
const parking = await getParking();

// Set up a recurring update
const update = async () => {
  await updateParking(parking);
  console.log(parking); // Logs the array of parking objects with updated 'full' status
  setTimeout(update, 60 * 1000); // Check again in 1 minute
};
update();
```

## Data Sources & Architecture

-   **Parking Facility Data**: Static information about the parking lots (name, capacity, location) is fetched from an RDF source provided by the Sabae City open data platform.
-   **Real-time Sensor Data**: Live full/vacant status is retrieved from a CSV endpoint on `mixsoda.io`.
-   **Data Fetching**: A client-side proxy script, `fetchViaProxy.js`, is used to handle cross-origin requests and convert JSONP responses to JSON.
-   **Data Backup**: A [GitHub Actions workflow](./.github/workflows/scheduled-backup.yml) runs daily at 16:31 UTC to back up the sensor data.

## Open Data

This project utilizes open data from Sabae City.

-   [駐車場(福井県鯖江市) - ParkingFacility - オープンデータプラットフォーム | データカタログサイト](https://ckan.odp.jig.jp/ja/dataset/jp-fukui-sabae-953-odp/resource/f4c10f77-cd9e-471e-a2c5-67198371604d)

## License

MIT License