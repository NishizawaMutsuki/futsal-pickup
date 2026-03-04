import { View, Text } from "react-native";

/**
 * 情報表示カード
 * アイコン、ラベル、値を表示する汎用コンポーネント
 */
export default function InfoItem({ icon, label, value }) {
  return (
    <View className="flex-1 bg-white rounded-2xl p-3 items-center gap-1 border border-gray-100">
      {icon}
      <Text className="text-xs text-gray-400">{label}</Text>
      <Text className="text-sm font-semibold text-gray-900">{value}</Text>
    </View>
  );
}
