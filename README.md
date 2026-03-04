# PickUp - フットサルマッチング

都市部でフットサルの仲間を見つけるマッチングプラットフォーム。

## 画面構成

| 画面 | 機能 |
|------|------|
| ホーム | エリア検索、レベルフィルター、マッチ一覧 |
| マッチ詳細 | 主催者情報、ルール、レビュー、参加ボタン |
| マッチ作成 | タイトル・会場・日時・レベル・定員・料金設定 |
| 通知 | リマインド、新着マッチ、レビュー通知 |
| マイページ | 評価、参加数、QRチェックイン、レビュー一覧 |

## 技術スタック

- Expo SDK 55 + React Native + React 19
- Expo Router（ファイルベースルーティング）
- NativeWind + Tailwind CSS（スタイリング）
- Lucide React Native（アイコン）

## 開発

```bash
npm install
npm start          # Expo dev server
npm run ios        # iOS シミュレータ
npm run android    # Android エミュレータ
npm run web        # Web版 (localhost:8081)
```

## ドキュメント

- [企画書・ロードマップ](./docs/PLANNING.md)
- [デプロイガイド](./docs/DEPLOY.md)
