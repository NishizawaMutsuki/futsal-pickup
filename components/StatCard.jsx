import { View, Text } from "react-native";
import { useColors } from "../contexts/ThemeContext";

export default function StatCard({ value, label }) {
  const colors = useColors();

  return (
    <View
      className="flex-1 rounded-2xl p-4 items-center"
      style={{
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Text className="text-2xl font-bold" style={{ color: colors.foreground }}>
        {value}
      </Text>
      <Text
        className="text-xs mt-1"
        style={{ color: colors.mutedForeground }}
      >
        {label}
      </Text>
    </View>
  );
}
