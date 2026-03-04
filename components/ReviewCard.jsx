import { View, Text } from "react-native";
import { useColors } from "../contexts/ThemeContext";
import StarRating from "./StarRating";

function Avatar({ name, colors }) {
  const initials = name ? name.slice(0, 1) : "?";
  return (
    <View
      className="w-9 h-9 rounded-full items-center justify-center"
      style={{ backgroundColor: colors.primaryBg }}
    >
      <Text className="text-xs font-bold" style={{ color: colors.primary }}>
        {initials}
      </Text>
    </View>
  );
}

export default function ReviewCard({ review }) {
  const colors = useColors();

  return (
    <View
      className="rounded-2xl p-4"
      style={{
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <View className="flex-row items-center gap-3 mb-2">
        <Avatar name={review.userName} colors={colors} />
        <View className="flex-1">
          <Text
            className="text-sm font-semibold"
            style={{ color: colors.foreground }}
          >
            {review.userName}
          </Text>
          <StarRating rating={review.rating} size={12} />
        </View>
      </View>
      <Text
        className="text-sm leading-5"
        style={{ color: colors.mutedForeground }}
      >
        {review.comment}
      </Text>
    </View>
  );
}
