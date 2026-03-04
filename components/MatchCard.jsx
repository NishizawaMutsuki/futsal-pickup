import { View, Text } from "react-native";
import { Calendar, MapPin, Users, Banknote } from "lucide-react-native";
import SkillBadge from "./SkillBadge";
import ProgressBar from "./ProgressBar";
import PressableScale from "./PressableScale";
import { getSpotsLeft } from "../data/mock";

export default function MatchCard({ match, onPress }) {
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
      className="bg-white rounded-2xl border border-gray-200 p-4 mx-4 mb-3"
    >
      {/* HOT badge */}
      {isAlmostFull && !isFull && (
        <View className="absolute top-0 right-0 rounded-tr-2xl rounded-bl-xl bg-emerald-600 px-2.5 py-1 flex-row items-center gap-1 z-10">
          <View className="w-1.5 h-1.5 rounded-full bg-white" />
          <Text className="text-white text-xs font-bold">HOT</Text>
        </View>
      )}

      {/* FULL badge */}
      {isFull && (
        <View className="absolute top-0 right-0 rounded-tr-2xl rounded-bl-xl bg-red-500 px-2.5 py-1 z-10">
          <Text className="text-white text-xs font-bold">FULL</Text>
        </View>
      )}

      {/* Title + skill badge */}
      <View className="flex-row items-start justify-between gap-2 mb-3">
        <Text className="text-base font-bold text-gray-900 leading-snug flex-1">
          {match.title}
        </Text>
        <SkillBadge level={match.level} />
      </View>

      {/* Date & venue */}
      <View className="gap-2 mb-4">
        <View className="flex-row items-center gap-2.5">
          <View className="w-6 h-6 rounded-lg bg-emerald-50 items-center justify-center">
            <Calendar size={14} color="#059669" />
          </View>
          <Text className="text-xs font-medium text-gray-700">
            {match.date}（{match.dayLabel}） {match.startTime}〜{match.endTime}
          </Text>
        </View>
        <View className="flex-row items-center gap-2.5">
          <View className="w-6 h-6 rounded-lg bg-emerald-50 items-center justify-center">
            <MapPin size={14} color="#059669" />
          </View>
          <Text className="text-xs text-gray-500" numberOfLines={1}>
            {match.venue}
            <Text className="text-gray-300"> / </Text>
            {match.area}
          </Text>
        </View>
      </View>

      {/* Capacity & fee */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-1.5">
          <Users size={16} color="#059669" />
          <Text className="text-sm font-bold text-gray-900">
            {match.currentPlayers}
            <Text className="text-gray-500 font-normal">
              /{match.maxPlayers}人
            </Text>
          </Text>
        </View>
        <View className="flex-row items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-lg">
          <Banknote size={14} color="#059669" />
          <Text className="text-sm font-bold text-gray-900">
            ¥{match.price.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <ProgressBar current={match.currentPlayers} max={match.maxPlayers} />
    </PressableScale>
  );
}
