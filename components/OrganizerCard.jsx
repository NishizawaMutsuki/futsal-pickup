import { View, Text } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { useColors } from "../contexts/ThemeContext";
import StarRating from "./StarRating";

function Avatar({ name, colors }) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "?";
  return (
    <View
      className="w-12 h-12 rounded-full items-center justify-center"
      style={{ backgroundColor: colors.primaryBg }}
    >
      <Text className="text-sm font-bold" style={{ color: colors.primary }}>
        {initials}
      </Text>
    </View>
  );
}

export default function OrganizerCard({ host }) {
  const colors = useColors();

  return (
    <View>
      <Text className="text-sm font-bold mb-3" style={{ color: colors.foreground }}>
        主催者
      </Text>
      <View
        className="rounded-2xl p-4"
        style={{
          backgroundColor: colors.card,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        <View className="flex-row items-center gap-3">
          <Avatar name={host.name} colors={colors} />
          <View className="flex-1">
            <Text
              className="text-sm font-bold"
              style={{ color: colors.foreground }}
            >
              {host.name}
            </Text>
            <View className="flex-row items-center gap-2 mt-1">
              <StarRating rating={host.rating} size={12} />
              <Text
                className="text-xs font-medium"
                style={{ color: colors.mutedForeground }}
              >
                {host.rating}
              </Text>
            </View>
            <Text
              className="text-xs mt-1"
              style={{ color: colors.mutedForeground }}
            >
              {host.matchCount}回開催
            </Text>
          </View>
          <ChevronRight size={20} color={colors.mutedForeground} />
        </View>
      </View>
    </View>
  );
}
