import { View, Text } from "react-native";

export default function StatCard({ value, label }) {
  return (
    <View className="flex-1 bg-white rounded-2xl border border-gray-200 p-4 items-center">
      <Text className="text-2xl font-bold text-gray-900">{value}</Text>
      <Text className="text-xs text-gray-500 mt-1">{label}</Text>
    </View>
  );
}
