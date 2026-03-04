import { View, Text } from "react-native";
import { Calendar, MapPin, Users, Banknote } from "lucide-react-native";
import { useColors } from "../contexts/ThemeContext";
import SkillBadge from "./SkillBadge";
import ProgressBar from "./ProgressBar";
import PressableScale from "./PressableScale";
import { getSpotsLeft } from "../data/mock";

export default function MatchCard({ match, onPress }) {
  const colors = useColors();
  const spotsLeft = getSpotsLeft(match);
  const fillPercent = Math.round(
    (match.currentPlayers / match.maxPlayers) * 100
  );
  const isAlmostFull = fillPercent >= 80;
  const isFull = match.currentPlayers >= match.maxPlayers;

  return (
    <PressableScale
      onPress={onPress}
      scale={0.98}
      className="rounded-2xl p-4 mx-4 mb-3"
      style={{
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      {/* HOT badge */}
      {isAlmostFull && !isFull && (
        <View
          className="absolute top-0 right-0 rounded-tr-2xl rounded-bl-xl px-2.5 py-1 flex-row items-center gap-1 z-10"
          style={{ backgroundColor: colors.primary }}
        >
          <View
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: colors.primaryForeground }}
          />
          <Text
            className="text-xs font-bold"
            style={{ color: colors.primaryForeground }}
          >
            HOT
          </Text>
        </View>
      )}

      {/* FULL badge */}
      {isFull && (
        <View
          className="absolute top-0 right-0 rounded-tr-2xl rounded-bl-xl px-2.5 py-1 z-10"
          style={{ backgroundColor: colors.destructive }}
        >
          <Text
            className="text-xs font-bold"
            style={{ color: colors.destructiveForeground }}
          >
            FULL
          </Text>
        </View>
      )}

      {/* Title + skill badge */}
      <View className="flex-row items-start justify-between gap-2 mb-3">
        <Text
          className="text-base font-bold leading-snug flex-1"
          style={{ color: colors.cardForeground }}
        >
          {match.title}
        </Text>
        <SkillBadge level={match.level} />
      </View>

      {/* Date & venue */}
      <View className="gap-2 mb-4">
        <View className="flex-row items-center gap-2.5">
          <View
            className="w-6 h-6 rounded-lg items-center justify-center"
            style={{ backgroundColor: colors.primaryBg }}
          >
            <Calendar size={14} color={colors.primary} />
          </View>
          <Text
            className="text-xs font-medium"
            style={{ color: colors.secondaryForeground }}
          >
            {match.date}（{match.dayLabel}） {match.startTime}〜{match.endTime}
          </Text>
        </View>
        <View className="flex-row items-center gap-2.5">
          <View
            className="w-6 h-6 rounded-lg items-center justify-center"
            style={{ backgroundColor: colors.primaryBg }}
          >
            <MapPin size={14} color={colors.primary} />
          </View>
          <Text
            className="text-xs"
            style={{ color: colors.mutedForeground }}
            numberOfLines={1}
          >
            {match.venue} / {match.area}
          </Text>
        </View>
      </View>

      {/* Capacity & fee */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-1.5">
          <Users size={16} color={colors.primary} />
          <Text className="text-sm font-bold" style={{ color: isFull ? colors.destructive : colors.foreground }}>
            {match.currentPlayers}
            <Text style={{ color: colors.mutedForeground }} className="font-normal">
              /{match.maxPlayers}人
            </Text>
          </Text>
        </View>
        <View
          className="flex-row items-center gap-1.5 px-3 py-1.5 rounded-lg"
          style={{ backgroundColor: colors.secondary }}
        >
          <Banknote size={14} color={colors.primary} />
          <Text
            className="text-sm font-bold"
            style={{ color: colors.foreground }}
          >
            ¥{match.price.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <ProgressBar current={match.currentPlayers} max={match.maxPlayers} />
    </PressableScale>
  );
}
