import { View, Text } from "react-native";
import { TrendingUp, Zap, Flame } from "lucide-react-native";
import { LEVEL_CONFIG } from "../data/constants";

const SKILL_STYLE = {
  beginner: {
    container: "bg-emerald-100 border border-emerald-300",
    text: "text-emerald-700",
    icon: TrendingUp,
    iconColor: "#059669",
  },
  intermediate: {
    container: "bg-amber-100 border border-amber-300",
    text: "text-amber-600",
    icon: Zap,
    iconColor: "#d97706",
  },
  advanced: {
    container: "bg-red-100 border border-red-300",
    text: "text-red-600",
    icon: Flame,
    iconColor: "#dc2626",
  },
};

export default function SkillBadge({ level }) {
  const config = LEVEL_CONFIG[level];
  const style = SKILL_STYLE[level];
  if (!config || !style) return null;

  const IconComponent = style.icon;

  return (
    <View
      className={`flex-row items-center gap-1 px-2.5 py-1 rounded-lg ${style.container}`}
    >
      <IconComponent size={10} color={style.iconColor} />
      <Text className={`text-xs font-bold ${style.text}`}>{config.label}</Text>
    </View>
  );
}
