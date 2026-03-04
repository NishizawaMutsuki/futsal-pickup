import { View, Text } from "react-native";
import StarRating from "./StarRating";

export default function ReviewCard({ review }) {
  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center gap-2">
          <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
            <Text className="text-sm">👤</Text>
          </View>
          <Text className="font-semibold text-gray-900">
            {review.userName}
          </Text>
        </View>
        <Text className="text-xs text-gray-400">{review.date}</Text>
      </View>
      <StarRating rating={review.rating} size={12} />
      <Text className="text-sm text-gray-600 mt-2">{review.comment}</Text>
    </View>
  );
}
