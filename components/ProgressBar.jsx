import { View, Text } from "react-native";

export default function ProgressBar({ current, max }) {
  const pct = Math.min((current / max) * 100, 100);
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
      <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <View
          className={
            isAlmostFull
              ? "h-full bg-red-500 rounded-full"
              : "h-full bg-emerald-500 rounded-full"
          }
          style={{ width: `${pct}%` }}
        />
      </View>
    </View>
  );
}
