import { Text, View } from "react-native";
import { LEVELS } from "../data/constants";

export default function SkillBadge({ level }) {
  const config = LEVELS[level];
  if (!config) return null;

  return (
    <View className={`px-2.5 py-1 rounded-full ${config.bg}`}>
      <Text className={`text-xs font-semibold ${config.text}`}>
        {config.label}
      </Text>
    </View>
  );
}
