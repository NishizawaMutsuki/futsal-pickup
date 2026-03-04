import { View, Text } from "react-native";
import StarRating from "./StarRating";

function Avatar({ name }) {
  const initials = name ? name.slice(0, 1) : "?";
  return (
    <View className="w-9 h-9 rounded-full bg-emerald-100 items-center justify-center">
      <Text className="text-xs font-bold text-emerald-700">{initials}</Text>
    </View>
  );
}

export default function ReviewCard({ review }) {
  return (
    <View className="bg-white rounded-2xl border border-gray-200 p-4">
      <View className="flex-row items-center gap-3 mb-2">
        <Avatar name={review.userName} />
        <View className="flex-1">
          <Text className="text-sm font-semibold text-gray-900">
            {review.userName}
          </Text>
          <StarRating rating={review.rating} size={12} />
        </View>
      </View>
      <Text className="text-sm text-gray-500 leading-5">{review.comment}</Text>
    </View>
  );
}
