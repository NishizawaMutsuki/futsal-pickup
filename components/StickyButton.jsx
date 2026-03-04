import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function StickyButton({ label, onPress, disabled = false, icon }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="px-4 pt-3 bg-white border-t border-gray-100"
      style={{ paddingBottom: Math.max(insets.bottom, 16) }}
    >
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        className={
          disabled
            ? "bg-gray-300 rounded-xl py-4 items-center flex-row justify-center gap-2"
            : "bg-emerald-600 rounded-xl py-4 items-center flex-row justify-center gap-2"
        }
        activeOpacity={0.8}
      >
        {icon}
        <Text
          className={
            disabled
              ? "text-white font-bold text-base"
              : "text-white font-bold text-base"
          }
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
