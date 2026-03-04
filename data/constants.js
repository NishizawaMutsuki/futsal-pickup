// ===== カラー定数 =====
export const COLORS = {
  primary: "#059669",
  primaryDark: "#047857",
  primaryLight: "#d1fae5",
  white: "#ffffff",
  gray50: "#f9fafb",
  gray100: "#f3f4f6",
  gray200: "#e5e7eb",
  gray300: "#d1d5db",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray700: "#374151",
  gray900: "#111827",
};

// ===== エリア =====
export const AREAS = ["渋谷", "新宿", "代々木", "六本木", "池袋", "恵比寿"];

// ===== レベル設定 =====
// LEVEL_CONFIGとLEVELSを統合
export const LEVELS = {
  all: {
    key: "all",
    label: "すべて",
    color: "gray",
    bg: "bg-gray-100",
    text: "text-gray-700",
    hex: "#6b7280",
  },
  beginner: {
    key: "beginner",
    label: "初心者OK",
    color: "emerald",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    hex: "#059669",
  },
  intermediate: {
    key: "intermediate",
    label: "経験者",
    color: "amber",
    bg: "bg-amber-100",
    text: "text-amber-700",
    hex: "#d97706",
  },
  advanced: {
    key: "advanced",
    label: "ガチ",
    color: "red",
    bg: "bg-red-100",
    text: "text-red-700",
    hex: "#dc2626",
  },
};

// フィルタータブ用の配列
export const LEVEL_OPTIONS = Object.values(LEVELS);

// ===== 通知タイプ =====
export const NOTIFICATION_TYPES = {
  reminder: { icon: "Clock", color: "#059669", bg: "bg-emerald-100" },
  new_match: { icon: "MapPin", color: "#3b82f6", bg: "bg-blue-100" },
  review: { icon: "Star", color: "#f59e0b", bg: "bg-amber-100" },
  cancel: { icon: "XCircle", color: "#ef4444", bg: "bg-red-100" },
  join: { icon: "UserPlus", color: "#8b5cf6", bg: "bg-purple-100" },
};
