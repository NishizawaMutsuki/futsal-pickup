import { View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { router } from "expo-router";

export default function GradientHeader({
  title,
  subtitle,
  showBack = false,
  children,
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-emerald-600 px-4 pb-4"
      style={{ paddingTop: insets.top + 8 }}
    >
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
        <Text className="text-white text-2xl font-bold">{title}</Text>
      )}
      {subtitle && (
        <Text className="text-emerald-100 text-sm mt-1">{subtitle}</Text>
      )}
      {children}
    </View>
  );
}
