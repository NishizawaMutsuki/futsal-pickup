import { View, Text } from "react-native";

export default function ProgressBar({ current, max }) {
  const pct = Math.max(Math.min((current / max) * 100, 100), 4);
  const spotsLeft = max - current;
  const isAlmostFull = spotsLeft <= 2;

  return (
    <View className="gap-1.5">
      <View className="flex-row justify-between items-center">
        <Text className="text-xs text-gray-500">
          {current}/{max}人
        </Text>
        <Text
          className={
            isAlmostFull
              ? "text-xs font-semibold text-red-500"
              : "text-xs text-gray-400"
          }
        >
          {spotsLeft > 0 ? `残り${spotsLeft}枠` : "満員"}
        </Text>
      </View>
      <View className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <View
          className={
            isAlmostFull
              ? "h-full bg-red-400 rounded-full"
              : "h-full bg-emerald-400 rounded-full"
          }
          style={{ width: `${pct}%` }}
        />
      </View>
    </View>
  );
}
