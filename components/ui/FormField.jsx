import { View, Text } from "react-native";

/**
 * フォームフィールドラッパー
 * ラベルとコンテンツをラップする汎用コンポーネント
 */
export default function FormField({ label, children }) {
  return (
    <View className="gap-1.5">
      <Text className="text-sm font-semibold text-gray-700">{label}</Text>
      {children}
    </View>
  );
}
