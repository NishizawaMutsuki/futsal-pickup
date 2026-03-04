# PickUp アプリ全画面実装プラン v2

## 元プランからの修正点

### 問題1: `_create.jsx` がルートとして認識されない
Expo Router では `_` プレフィックスのファイルはルートから**除外される**。
タブの中央+ボタン用ダミーとして `_create.jsx` は機能しない。

**修正**: `create.jsx` を `(tabs)/` 内に通常ファイルとして配置し、
`tabBarButton` カスタムで `router.push("/create")` にリダイレクト。
画面自体は `return null` で空にする。

### 問題2: NativeWind バージョン未指定
NativeWind v2 と v4 はセットアップが全く違う。
v2 = babel plugin + tailwind.config.js、v4 = CSS-first + metro plugin。

**修正**: **NativeWind v4** を明示。`global.css` に `@import "nativewind/theme"` を使う。
`tailwind.config.js` は不要（v4 は CSS ベース）。
→ 元プランの「tailwind.config.js に components/ パス追加」は **v4 では不要**。

### 問題3: ScrollView vs FlatList の混同
マッチ詳細・プロフィール・作成画面はリスト構造ではなく、
複合レイアウト。FlatList ではなく **ScrollView** を使うべき。

**修正**: FlatList はホーム画面のマッチ一覧と通知一覧のみ。
他の画面は ScrollView（KeyboardAwareScrollView for 作成画面）。

### 問題4: SafeArea 未考慮
iOS のノッチ/Dynamic Island、Android のステータスバー対応が抜けている。

**修正**: `expo-status-bar` + `SafeAreaProvider` + `useSafeAreaInsets` を使用。
ヘッダー部分は `paddingTop: insets.top` で手動調整（カスタムヘッダーのため）。

### 問題5: マッチ詳細へのデータ受け渡しが未定義
`match/[id].jsx` に遷移する際、ID だけでは詳細データを取得できない。

**修正**: Phase 0 ではモックデータから ID で lookup する。
`router.push({ pathname: "/match/[id]", params: { id } })` →
詳細画面で `useLocalSearchParams()` → `mock.js` から検索。

### 問題6: モーダルの presentation 設定が未記載
`create.jsx` をモーダル表示するには `_layout.jsx` 側で
`<Stack.Screen name="create" options={{ presentation: "modal" }}/>` が必要。

**修正**: Root `_layout.jsx` に明示的に設定。

### 問題7: 検索画面の役割が曖昧
ホーム画面にエリア検索＋レベルフィルターがある状態で、
別途「検索」タブを設ける意味が薄い。

**修正**: 検索タブを削除し **4タブ構成**（ホーム・+ボタン・通知・マイページ）に変更。
ホーム画面の上部にエリア検索＋フィルター機能を統合。

### 問題8: 主催者が自分のマッチを管理する画面がない
主催者が作成したマッチの参加状況を確認する導線が存在しない。

**修正**: マイページに「主催したマッチ」セクションを追加。
タップするとマッチ詳細（主催者ビュー）に遷移。

---

## 修正後のファイル構成

```
app/
  _layout.jsx                 # Root Stack
  create.jsx                  # マッチ作成 (modal presentation)
  (tabs)/
    _layout.jsx               # Tab bar (4タブ、中央に+ボタン)
    index.jsx                 # ホーム (検索 + マッチ一覧)
    create-placeholder.jsx    # +ボタン用（return null, tabBarButton でリダイレクト）
    notifications.jsx         # 通知
    profile.jsx               # マイページ
  match/
    [id].jsx                  # マッチ詳細 (push)

components/
  MatchCard.jsx               # マッチカード (FlatList アイテム)
  SkillBadge.jsx              # レベルバッジ (初心者OK / 経験者 / ガチ)
  FilterChips.jsx             # エリアフィルター (横スクロール ScrollView)
  SkillTabs.jsx               # レベルフィルタータブ
  OrganizerCard.jsx           # 主催者カード (詳細画面用)
  ReviewCard.jsx              # レビューカード
  NotificationItem.jsx        # 通知アイテム (FlatList アイテム)
  StatCard.jsx                # 統計カード (プロフィール用)
  StickyButton.jsx            # 固定ボタン (参加する / 作成する)
  GradientHeader.jsx          # 共通グラデーションヘッダー
  StarRating.jsx              # 星評価表示
  ProgressBar.jsx             # 参加人数プログレスバー

data/
  mock.js                     # モックデータ一式 + ヘルパー関数
  constants.js                # カラー定数、レベル定義

global.css                    # NativeWind v4 テーマ
```

---

## 依存パッケージ

```bash
# Expo + Router
npx create-expo-app@latest futsal-pickup-native
cd futsal-pickup-native

# NativeWind v4
npm install nativewind tailwindcss

# ナビゲーション (expo-router に同梱だが明示)
npx expo install expo-router expo-linking expo-constants expo-status-bar

# アイコン
npm install lucide-react-native react-native-svg

# SafeArea
npx expo install react-native-safe-area-context

# キーボード回避 (作成画面用)
npm install react-native-keyboard-aware-scroll-view
```

---

## NativeWind v4 セットアップ

### global.css
```css
@import "nativewind/theme";

@theme {
  --color-pickup-primary: #059669;
  --color-pickup-dark: #047857;
  --color-pickup-light: #d1fae5;
}
```

### metro.config.js
```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: "./global.css" });
```

### babel.config.js
```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    ],
  };
};
```

---

## データ設計: data/mock.js

```js
export const AREAS = ["渋谷", "新宿", "代々木", "六本木", "池袋", "恵比寿"];

export const LEVELS = [
  { key: "all", label: "すべて" },
  { key: "beginner", label: "初心者OK", color: "emerald" },
  { key: "intermediate", label: "経験者", color: "amber" },
  { key: "advanced", label: "ガチ", color: "red" },
];

export const MATCHES = [
  {
    id: "m1",
    title: "渋谷エンジョイフットサル",
    host: { id: "u1", name: "田中 太郎", avatar: "🧑", rating: 4.7, matchCount: 32, verified: true },
    venue: "アディダス フットサルパーク 渋谷",
    area: "渋谷",
    date: "2026-03-07",
    dayLabel: "土",
    startTime: "19:00",
    endTime: "21:00",
    level: "beginner",
    currentPlayers: 7,
    maxPlayers: 10,
    price: 1800,
    description: "初心者歓迎！ゆるく楽しくやりましょう。シューズ貸出あり。",
    rules: ["暴言禁止", "ガチプレー控えめ", "シューズ必須"],
    reviews: [
      { userId: "u2", userName: "佐藤", rating: 5, comment: "雰囲気最高でした！", date: "2026-02-28" },
      { userId: "u3", userName: "鈴木", rating: 4, comment: "初心者にも優しい", date: "2026-02-25" },
    ],
  },
  // ... 他のマッチデータ
];

export const MY_PROFILE = { /* ... */ };
export const NOTIFICATIONS = [ /* ... */ ];

// ヘルパー
export const getMatchById = (id) => MATCHES.find((m) => m.id === id);
export const getLevelConfig = (key) => LEVELS.find((l) => l.key === key);
export const getSpotsLeft = (match) => match.maxPlayers - match.currentPlayers;
```

---

## ルーティング詳細

### app/_layout.jsx (Root Stack)
```jsx
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="create"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen name="match/[id]" />
      </Stack>
    </SafeAreaProvider>
  );
}
```

### app/(tabs)/_layout.jsx (Tab Bar)
```jsx
import { Tabs, router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Home, Plus, Bell, User } from "lucide-react-native";

function CreateTabButton({ children, ...props }) {
  return (
    <TouchableOpacity
      {...props}
      onPress={() => router.push("/create")}
      className="items-center justify-center -mt-5"
    >
      <View className="w-14 h-14 bg-emerald-600 rounded-full items-center justify-center shadow-lg">
        <Plus color="white" size={28} />
      </View>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#059669",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#f3f4f6",
          height: 85,
          paddingBottom: 25,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="create-placeholder"
        options={{
          title: "作成",
          tabBarButton: (props) => <CreateTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "通知",
          tabBarIcon: ({ color, size }) => <Bell color={color} size={size} />,
          tabBarBadge: 3,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "マイページ",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
```

---

## 画面別実装ガイド

### 1. ホーム (tabs/index.jsx)

**構造**: SafeAreaView > FlatList
- ListHeaderComponent でヘッダー + 検索 + フィルターを配置
- FlatList 本体でマッチカード一覧
- ListEmptyComponent で空状態表示

**状態管理**:
```
searchText: string
selectedArea: string | null
selectedLevel: string ("all" | "beginner" | "intermediate" | "advanced")
```

**フィルターロジック**:
```js
const filtered = MATCHES.filter(m =>
  (!searchText || m.area.includes(searchText) || m.venue.includes(searchText)) &&
  (selectedLevel === "all" || m.level === selectedLevel) &&
  (!selectedArea || m.area === selectedArea)
);
```

**注意**: GradientHeader 部分は View + LinearGradient ではなく、
View に `className="bg-emerald-600"` で代用（expo-linear-gradient は追加パッケージ）。
グラデーションが必要なら `expo-linear-gradient` を追加インストール。

### 2. マッチ詳細 (match/[id].jsx)

**構造**: View > ScrollView（FlatList ではない）
- GradientHeader（戻るボタン付き）
- 情報カード（日時・人数・料金）グリッド
- OrganizerCard
- 説明 + ルールタグ
- ReviewCard の map（少数なので FlatList 不要）
- StickyButton（画面下固定、ScrollView の外に配置）

**データ取得**:
```js
const { id } = useLocalSearchParams();
const match = getMatchById(id);
```

**参加フロー**:
```
未参加 → 「参加する（¥1,800）」ボタン
タップ → useState で joined = true に切り替え
参加済み → 「参加確定！当日QRコードを提示してください」表示
```

**StickyButton の配置**:
```jsx
<View className="flex-1">
  <ScrollView>{/* 全コンテンツ */}</ScrollView>
  {/* ScrollView の外 = 画面下固定 */}
  <StickyButton
    label={joined ? "参加確定！" : `参加する（¥${match.price}）`}
    disabled={joined}
    onPress={() => setJoined(true)}
  />
</View>
```

### 3. マッチ作成 (create.jsx - モーダル)

**構造**: SafeAreaView > KeyboardAwareScrollView
- 閉じるボタン（X アイコン、router.back()）
- フォームフィールド群
- StickyButton（「募集を公開する」）

**状態管理**:
```
title: string
venue: string
date: string (DatePicker 使うなら expo-date-picker、Phase 0 は TextInput)
startTime: string
endTime: string
level: "beginner" | "intermediate" | "advanced"
maxPlayers: number (4-20)
price: number
description: string
autoApprove: boolean
```

**注意**:
- Phase 0 では日時入力は TextInput でプレーンテキスト入力
- Switch コンポーネントは React Native の標準 Switch を使用
- 定員の +/- ボタンは TouchableOpacity で実装
- 送信後は成功画面を表示 → 「閉じる」で router.back()

### 4. マイページ (tabs/profile.jsx)

**構造**: SafeAreaView > ScrollView
- GradientHeader（アバター・名前・認証バッジ）
- StatCard グリッド（評価・参加数・ポジション・ドタキャン率）
- QRチェックインカード（TouchableOpacity）
- 主催したマッチセクション（MatchCard の小型版 or リスト）
- もらったレビューセクション（ReviewCard の map）

### 5. 通知 (tabs/notifications.jsx)

**構造**: SafeAreaView > FlatList
- ListHeaderComponent で GradientHeader
- FlatList 本体で NotificationItem 一覧
- 通知タイプ別アイコン・カラー切り替え

---

## コンポーネント仕様

### MatchCard.jsx
```
Props:
  match: Match          # マッチデータオブジェクト
  onPress: () => void   # タップ時コールバック

表示:
  - レベルバッジ + 残り枠数
  - タイトル + 料金
  - 会場 + 日時
  - 参加人数プログレスバー
```

### SkillBadge.jsx
```
Props:
  level: string         # "beginner" | "intermediate" | "advanced"

カラーマッピング（完全クラス文字列で切り替え）:
  beginner     → "bg-emerald-100 text-emerald-700"
  intermediate → "bg-amber-100 text-amber-700"
  advanced     → "bg-red-100 text-red-700"
```

### GradientHeader.jsx
```
Props:
  title?: string
  subtitle?: string
  showBack?: boolean     # true なら戻るボタン表示
  children?: ReactNode   # ヘッダー内に追加要素（検索バー等）

内部: useSafeAreaInsets() で paddingTop を動的設定
```

### StickyButton.jsx
```
Props:
  label: string
  onPress: () => void
  disabled?: boolean
  icon?: ReactNode

配置: 各画面の ScrollView/FlatList の **外側** に置く
内部: useSafeAreaInsets() で paddingBottom を動的設定
```

---

## NativeWind 動的クラスの注意点

```jsx
// NG: テンプレートリテラルで組み立て → NativeWind が検出できない
<View className={`bg-${color}-100`} />

// OK: 完全なクラス文字列を三項演算子で切り替え
<View className={active ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"} />

// OK: 配列 + filter + join でも可
<View className={["px-4 py-2", active && "bg-emerald-600", disabled && "opacity-50"].filter(Boolean).join(" ")} />
```

---

## 実装順序（修正版）

### Step 1: プロジェクト初期化 + NativeWind v4 設定
- Expo プロジェクト作成
- NativeWind v4 インストール + metro.config.js + babel.config.js + global.css
- lucide-react-native + react-native-svg インストール
- **検証**: 空の画面で `className="bg-emerald-600"` が効くことを確認

### Step 2: データ + 定数
- data/constants.js（カラー・レベル定義）
- data/mock.js（全マッチ・プロフィール・通知 + ヘルパー関数）

### Step 3: 共通コンポーネント（依存順）
1. StarRating（依存なし）
2. SkillBadge（依存なし）
3. ProgressBar（依存なし）
4. GradientHeader（useSafeAreaInsets 依存）
5. FilterChips（AREAS 依存）
6. SkillTabs（LEVELS 依存）
7. StatCard（依存なし）
8. StickyButton（useSafeAreaInsets 依存）
9. ReviewCard（StarRating 依存）
10. OrganizerCard（StarRating 依存）
11. NotificationItem（依存なし）
12. MatchCard（SkillBadge + ProgressBar 依存）

### Step 4: ルーティング
- app/_layout.jsx（Root Stack + SafeAreaProvider）
- app/(tabs)/_layout.jsx（タブバー + 中央+ボタン）
- app/(tabs)/create-placeholder.jsx（return null）

### Step 5: 画面実装（依存順）
1. **ホーム** (tabs/index.jsx) — MatchCard + FilterChips + SkillTabs + GradientHeader
2. **マッチ詳細** (match/[id].jsx) — OrganizerCard + ReviewCard + StickyButton
3. **マッチ作成** (create.jsx) — StickyButton
4. **マイページ** (tabs/profile.jsx) — StatCard + ReviewCard
5. **通知** (tabs/notifications.jsx) — NotificationItem

### Step 6: 検証
- iOS シミュレータで全画面遷移確認
- タブ切替え → マッチタップ → 詳細 → 戻る
- +ボタン → モーダル → 作成 → 閉じる
- プロフィール → QRカード → レビュー表示
- キーボード表示時の作成画面スクロール確認
- Dynamic Island / ノッチ領域の表示確認

---

## 既知の制約（Phase 0）

| 項目 | Phase 0 の対応 | 本番での対応 |
|------|---------------|-------------|
| 日時選択 | TextInput | expo-date-picker |
| 画像 | 絵文字アバター | expo-image-picker + Supabase Storage |
| 決済 | なし（現地精算） | Stripe |
| 認証 | なし | Supabase Auth |
| プッシュ通知 | アプリ内のみ | expo-notifications + FCM/APNs |
| QRコード | 表示のみ | react-native-qrcode-svg + カメラ読取 |
| データ | mock.js | Supabase PostgreSQL |
| 地図 | なし | react-native-maps |
