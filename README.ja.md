# parking-view

福井県鯖江市の市営駐車場のリアルタイム空車・満車状況を表示するビューアです。

## ライブアプリケーション

- **[鯖江市営駐車場満車・空車状況 (Sabae City Parking Availability)](https://code4fukui.github.io/parking-view/)**

## 機能

- リアルタイムの空き状況（「満車」/「空車」）を表示します。
- 状態は色付きのラベルで示されます（赤色は「満車」、青色は「空車」）。
- ブラウザ上で60秒ごとにデータを自動更新します。
- モバイル端末での閲覧に適した転置テーブルレイアウトで情報を表示します。
- 外部フレームワークを必要とせず、バニラJavaScriptで構築されています。

## JavaScriptモジュールとしての利用

コアロジックをインポートして、他のプロジェクトで利用することができます。

```javascript
import { getParking, updateParking } from "https://code4fukui.github.io/parking-view/parking.js";

// 初期の駐車場情報を取得
const parking = await getParking();

// 定期的な更新を設定
const update = async () => {
  await updateParking(parking);
  console.log(parking); // 'full'（満車）ステータスが更新された駐車場オブジェクトの配列をログ出力
  setTimeout(update, 60 * 1000); // 1分後に再確認
};
update();
```

## データソースとアーキテクチャ

- **駐車場施設データ**: 駐車場の名称・容量・位置などの静的データは、鯖江市オープンデータプラットフォームが提供するRDFソースから取得します。
- **リアルタイムセンサーデータ**: 満車・空車のライブ状況は、`mixsoda.io`のCSVエンドポイントから取得します。
- **データ取得**: クロスオリジンリクエストを処理し、JSONPレスポンスをJSONに変換するために、クライアントサイドのプロキシスクリプト`fetchViaProxy.js`を使用しています。
- **データバックアップ**: [GitHub Actionsワークフロー](./.github/workflows/scheduled-backup.yml)が毎日 16:31 UTC に実行され、センサーデータをバックアップします。

## オープンデータ

本プロジェクトは鯖江市が提供するオープンデータを利用しています。

- [駐車場(福井県鯖江市) - ParkingFacility - オープンデータプラットフォーム | データカタログサイト](https://ckan.odp.jig.jp/ja/dataset/jp-fukui-sabae-953-odp/resource/f4c10f77-cd9e-471e-a2c5-67198371604d)

## ライセンス

MIT License
