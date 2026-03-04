import { View, Text } from "react-native";
import { Shield } from "lucide-react-native";
import StarRating from "./StarRating";

export default function OrganizerCard({ host }) {
  return (
    <View className="bg-white rounded-2xl p-5 shadow-md">
      <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
        主催者
      </Text>
      <View className="flex-row items-center gap-3">
        <View className="w-12 h-12 bg-emerald-100 rounded-full items-center justify-center">
          <Text className="text-2xl">{host.avatar}</Text>
        </View>
        <View className="flex-1">
          <View className="flex-row items-center gap-1.5">
            <Text className="font-bold text-gray-900 text-base">
              {host.name}
            </Text>
            {host.verified && (
              <Shield size={14} color="#059669" fill="#d1fae5" />
            )}
          </View>
          <View className="flex-row items-center gap-2 mt-1">
            <StarRating rating={host.rating} size={12} />
            <Text className="text-xs text-gray-500">
              {host.rating} ({host.matchCount}回開催)
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
