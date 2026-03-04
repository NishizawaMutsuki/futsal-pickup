import { View, Text } from "react-native";

export default function StatCard({ icon, value, label }) {
  return (
    <View className="flex-1 bg-white rounded-2xl p-4 items-center gap-2 shadow-md">
      <Text className="text-xl">{icon}</Text>
      <Text className="text-lg font-bold text-gray-900">{value}</Text>
      <Text className="text-xs text-gray-500">{label}</Text>
    </View>
  );
}
