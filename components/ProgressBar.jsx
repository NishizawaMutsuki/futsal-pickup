import { View } from "react-native";
import { useColors } from "../contexts/ThemeContext";

export default function ProgressBar({ current, max }) {
  const colors = useColors();
  const pct = Math.max(Math.min((current / max) * 100, 100), 4);
  const spotsLeft = max - current;
  const isFull = spotsLeft <= 0;
  const isAlmostFull = spotsLeft <= 2;

  const barColor = isFull
    ? colors.destructive
    : isAlmostFull
      ? colors.primary
      : colors.primary + "99";

  return (
    <View
      className="h-2 rounded-full overflow-hidden"
      style={{ backgroundColor: colors.secondary }}
    >
      <View
        className="h-full rounded-full"
        style={{
          width: `${pct}%`,
          backgroundColor: barColor,
        }}
      />
    </View>
  );
}
