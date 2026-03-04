import { View, Text } from "react-native";
import { TrendingUp, Zap, Flame } from "lucide-react-native";
import { useColors } from "../contexts/ThemeContext";
import { LEVEL_CONFIG } from "../data/constants";

export default function SkillBadge({ level }) {
  const colors = useColors();
  const config = LEVEL_CONFIG[level];
  if (!config) return null;

  const styles = {
    beginner: {
      bg: colors.primaryBg,
      border: colors.primaryBorder,
      text: colors.primary,
      Icon: TrendingUp,
    },
    intermediate: {
      bg: colors.amberBg,
      border: colors.amberBorder,
      text: colors.amber,
      Icon: Zap,
    },
    advanced: {
      bg: colors.redBg,
      border: colors.redBorder,
      text: colors.destructive,
      Icon: Flame,
    },
  };

  const s = styles[level] || styles.beginner;

  return (
    <View
      className="flex-row items-center gap-1 px-2.5 py-1 rounded-lg"
      style={{ backgroundColor: s.bg, borderWidth: 1, borderColor: s.border }}
    >
      <s.Icon size={10} color={s.text} />
      <Text style={{ color: s.text }} className="text-xs font-bold">
        {config.label}
      </Text>
    </View>
  );
}
