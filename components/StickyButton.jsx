import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function StickyButton({ label, onPress, disabled = false, icon }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="p-4 bg-white/90 border-t border-gray-200"
      style={{ paddingBottom: Math.max(insets.bottom, 16) }}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        className={
          disabled
            ? "h-14 rounded-2xl bg-gray-300 items-center flex-row justify-center gap-2"
            : "h-14 rounded-2xl bg-emerald-600 items-center flex-row justify-center gap-2"
        }
        activeOpacity={0.8}
      >
        {icon}
        <Text
          className={
            disabled
              ? "text-gray-400 font-bold text-base"
              : "text-white font-bold text-base"
          }
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
