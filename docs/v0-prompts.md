# v0 プロンプト集

v0.dev に貼り付けて使う。各画面ごとに個別に生成すること。
出力は Tailwind CSS のモバイルUIになるので、NativeWind に変換して使う。

---

## 1. ホーム画面（マッチ一覧）

```
Design a mobile app home screen (390px width) for a futsal pickup game matching app called "PickUp".

Requirements:
- Top: Search bar with area filter (Tokyo districts like 渋谷, 新宿, 六本木) as horizontal scrollable chips
- Below search: Skill level filter tabs (すべて / 初心者OK / 経験者 / ガチ)
- Main content: Vertical list of match cards, each card showing:
  - Match title (e.g. "渋谷エンジョイフットサル")
  - Date and time (e.g. "3/8(土) 19:00-21:00")
  - Venue name and area
  - Skill level badge
  - Current participants vs max capacity (e.g. "7/10人")
  - Participation fee (e.g. "¥1,500")
  - A progress bar showing how full the match is
- Bottom: Tab navigation bar with icons for ホーム, 検索, マッチ作成(+), 通知, マイページ
- Style: Clean, modern, sporty. Use a green/emerald accent color. White background with subtle card shadows.
- All text in Japanese.
- Use Tailwind CSS. Use lucide-react icons.
```

---

## 2. マッチ詳細画面

```
Design a mobile app match detail screen (390px width) for a futsal pickup game app called "PickUp".

Requirements:
- Top: Back arrow and share button
- Hero section: Match title "渋谷エンジョイフットサル", date "3/8(土) 19:00-21:00", skill level badge "初心者OK"
- Info section with icons:
  - 📍 Venue: "渋谷フットサルコート" with small map placeholder
  - 💰 Fee: "¥1,500 / 人"
  - 👥 Capacity: "7/10人 参加中" with participant avatars in a row
  - 📋 Rules: "ミックス可・ビブス持参不要"
- Organizer card: Avatar, name, rating stars (4.5), number of hosted matches
- Description text area with match details
- Reviews section: 2-3 review cards with avatar, name, star rating, comment
- Bottom: Fixed sticky bar with "参加する" (Join) primary button, green/emerald color
- Style: Clean, modern, sporty. Green/emerald accent. White background.
- All text in Japanese.
- Use Tailwind CSS. Use lucide-react icons.
```

---

## 3. マッチ作成画面

```
Design a mobile app match creation form screen (390px width) for a futsal pickup game app called "PickUp".

Requirements:
- Top: "マッチを作成" title with close (X) button
- Form fields with clean labels:
  - タイトル (text input, placeholder: "渋谷エンジョイフットサル")
  - 会場 (venue selector with search)
  - 日時 (date and time picker, showing date and start/end time)
  - レベル (segmented control: 初心者OK / 経験者 / ガチ)
  - 定員 (number stepper, e.g. 10人)
  - 参加費 (currency input, ¥)
  - ルール・備考 (textarea, placeholder: "ビブス持参不要、初心者歓迎！")
  - 承認方法 (toggle: 自動承認 / 手動承認)
- Bottom: Fixed "作成する" primary button, green/emerald
- Style: Clean form design with rounded inputs, subtle borders. Green/emerald accent.
- All text in Japanese.
- Use Tailwind CSS. Use lucide-react icons.
```

---

## 4. マイページ画面

```
Design a mobile app profile/my page screen (390px width) for a futsal pickup game app called "PickUp".

Requirements:
- Top: Profile header with:
  - Large avatar (circular)
  - User name "田中 太郎"
  - Star rating "4.8" with review count "(23件)"
  - Edit profile button (outline style)
- Stats row: 3 columns showing 参加数 "48回", 主催数 "12回", ドタキャン率 "0%"
- Section: "今後の予定" - upcoming match cards (1-2 cards) with date, title, venue
- Section: "参加履歴" - past match cards (2-3 cards) with date, title, and review status
- Section: "レビュー" - received reviews list with avatar, name, stars, comment
- Bottom: Tab navigation bar (same as home screen)
- Style: Clean, modern. Green/emerald accent. White background.
- All text in Japanese.
- Use Tailwind CSS. Use lucide-react icons.
```

---

## 5. 通知画面

```
Design a mobile app notifications screen (390px width) for a futsal pickup game app called "PickUp".

Requirements:
- Top: "通知" title
- Notification list, each item showing:
  - Icon indicating type (different colors per type)
  - Title and description text
  - Timestamp (e.g. "2時間前", "昨日")
  - Unread indicator (dot)
- Notification types:
  - 🟢 Match reminder: "明日のマッチのリマインド - 渋谷エンジョイフットサル 19:00"
  - 🔵 New match: "新着マッチ - 新宿ガチフットサル 3/10(月)"
  - 🟡 Review received: "田中さんからレビューが届きました ⭐4.5"
  - 🔴 Cancellation: "マッチがキャンセルされました - 六本木フットサル"
  - 🟣 Participant joined: "山田さんが参加しました - 渋谷エンジョイフットサル"
- Show some items as read (slightly faded) and some as unread
- Bottom: Tab navigation bar (same as home screen)
- Style: Clean notification list. Green/emerald accent. White background.
- All text in Japanese.
- Use Tailwind CSS. Use lucide-react icons.
```

---

## 使い方

1. v0.dev にアクセス
2. 各プロンプトを1つずつ貼り付けて生成
3. 気に入ったデザインが出るまで微調整（「もっとスポーティに」「カードの角をもっと丸く」など追加指示）
4. 生成されたコードの Tailwind クラスと構造を参考に、Expo + NativeWind で実装
