import { View } from "react-native";
import { Star } from "lucide-react-native";
import { useColors } from "../contexts/ThemeContext";

export default function StarRating({ rating, size = 14 }) {
  const colors = useColors();
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.5;
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push(
        <Star key={i} size={size} color="#f59e0b" fill="#f59e0b" />
      );
    } else if (i === full && hasHalf) {
      stars.push(
        <Star key={i} size={size} color="#f59e0b" fill="#f59e0b" strokeWidth={1} />
      );
    } else {
      stars.push(
        <Star key={i} size={size} color={colors.mutedForeground + "40"} />
      );
    }
  }

  return <View className="flex-row gap-0.5">{stars}</View>;
}
