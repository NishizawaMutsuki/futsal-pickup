import { View } from "react-native";

export default function ProgressBar({ current, max }) {
  const pct = Math.max(Math.min((current / max) * 100, 100), 4);
  const spotsLeft = max - current;
  const isAlmostFull = spotsLeft <= 2;
  const isFull = spotsLeft <= 0;

  const barClass = isFull
    ? "h-full bg-red-500 rounded-full"
    : isAlmostFull
      ? "h-full bg-emerald-500 rounded-full"
      : "h-full bg-emerald-400 rounded-full";

  return (
    <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <View className={barClass} style={{ width: `${pct}%` }} />
    </View>
  );
}
