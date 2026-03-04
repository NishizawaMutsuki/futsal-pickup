import { View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PressableScale from "./PressableScale";

export default function StickyButton({ label, onPress, disabled = false, icon }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="px-4 pt-3 bg-white"
      style={{
        paddingBottom: Math.max(insets.bottom, 16),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 8,
      }}
    >
      <PressableScale
        onPress={onPress}
        disabled={disabled}
        scale={0.98}
        className={
          disabled
            ? "bg-gray-300 rounded-2xl py-4 items-center flex-row justify-center gap-2"
            : "bg-emerald-600 rounded-2xl py-4 items-center flex-row justify-center gap-2"
        }
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
      </PressableScale>
    </View>
  );
}
