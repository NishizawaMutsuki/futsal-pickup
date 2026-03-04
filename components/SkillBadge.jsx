import { Text, View } from "react-native";
import { LEVEL_CONFIG } from "../data/constants";

export default function SkillBadge({ level }) {
  const config = LEVEL_CONFIG[level];
  if (!config) return null;

  const containerClass =
    level === "beginner"
      ? "bg-emerald-100"
      : level === "intermediate"
        ? "bg-amber-100"
        : "bg-red-100";

  const textClass =
    level === "beginner"
      ? "text-emerald-700"
      : level === "intermediate"
        ? "text-amber-700"
        : "text-red-700";

  return (
    <View className={`px-2.5 py-1 rounded-full ${containerClass}`}>
      <Text className={`text-xs font-semibold ${textClass}`}>
        {config.label}
      </Text>
    </View>
  );
}
