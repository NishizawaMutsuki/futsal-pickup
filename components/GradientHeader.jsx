import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";

export default function GradientHeader({
  title,
  subtitle,
  showBack = false,
  large = false,
  curveWhite = false,
  children,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View className="relative overflow-hidden">
      <View
        className="bg-emerald-700 px-4 pb-6"
        style={{ paddingTop: insets.top + 8 }}
      >
        {/* Decorative circle */}
        <View
          className="absolute bg-emerald-600 rounded-full opacity-50"
          style={{ width: 180, height: 180, top: -40, right: -40 }}
        />
        {showBack && (
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center mb-2 -ml-1"
          >
            <ChevronLeft color="white" size={24} />
            <Text className="text-white text-base ml-0.5">戻る</Text>
          </TouchableOpacity>
        )}
        {title && (
          <Text
            className={
              large
                ? "text-white text-3xl font-bold"
                : "text-white text-2xl font-bold"
            }
          >
            {title}
          </Text>
        )}
        {subtitle && (
          <Text className="text-emerald-100 text-sm mt-1">{subtitle}</Text>
        )}
        {children}
      </View>
      <View className="bg-emerald-700">
        <View className={curveWhite ? "h-4 bg-white rounded-t-3xl" : "h-4 bg-gray-50 rounded-t-3xl"} />
      </View>
    </View>
  );
}
