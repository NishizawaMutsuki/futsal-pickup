import { View } from "react-native";
import { Star } from "lucide-react-native";

export default function StarRating({ rating, size = 14 }) {
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
        <Star key={i} size={size} color="#d1d5db" />
      );
    }
  }

  return <View className="flex-row gap-0.5">{stars}</View>;
}
