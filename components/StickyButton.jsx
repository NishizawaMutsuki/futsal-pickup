import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "../contexts/ThemeContext";

export default function StickyButton({ label, onPress, disabled = false, icon }) {
  const insets = useSafeAreaInsets();
  const colors = useColors();

  return (
    <View
      className="p-4"
      style={{
        backgroundColor: colors.background + "cc",
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingBottom: Math.max(insets.bottom, 16),
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        className="h-14 rounded-2xl items-center flex-row justify-center gap-2"
        style={{
          backgroundColor: disabled ? colors.muted : colors.primary,
          shadowColor: disabled ? "transparent" : colors.primaryGlow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 24,
          elevation: 8,
        }}
        activeOpacity={0.8}
      >
        {icon}
        <Text
          className="font-bold text-base"
          style={{
            color: disabled
              ? colors.mutedForeground
              : colors.primaryForeground,
          }}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
