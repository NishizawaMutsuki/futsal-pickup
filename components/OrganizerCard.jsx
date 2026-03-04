import { View, Text } from "react-native";
import { ChevronRight } from "lucide-react-native";
import StarRating from "./StarRating";

function Avatar({ name }) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "?";
  return (
    <View className="w-12 h-12 rounded-full bg-emerald-100 items-center justify-center">
      <Text className="text-sm font-bold text-emerald-700">{initials}</Text>
    </View>
  );
}

export default function OrganizerCard({ host }) {
  return (
    <View>
      <Text className="text-sm font-bold text-gray-900 mb-3">主催者</Text>
      <View className="bg-white rounded-2xl border border-gray-200 p-4">
        <View className="flex-row items-center gap-3">
          <Avatar name={host.name} />
          <View className="flex-1">
            <Text className="text-sm font-bold text-gray-900">
              {host.name}
            </Text>
            <View className="flex-row items-center gap-2 mt-1">
              <StarRating rating={host.rating} size={12} />
              <Text className="text-xs font-medium text-gray-500">
                {host.rating}
              </Text>
            </View>
            <Text className="text-xs text-gray-500 mt-1">
              {host.matchCount}回開催
            </Text>
          </View>
          <ChevronRight size={20} color="#9ca3af" />
        </View>
      </View>
    </View>
  );
}
