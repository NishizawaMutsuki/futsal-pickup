import { View, Text } from "react-native";
import { MapPin, Calendar, Clock } from "lucide-react-native";
import SkillBadge from "./SkillBadge";
import ProgressBar from "./ProgressBar";
import PressableScale from "./PressableScale";
import { getSpotsLeft } from "../data/mock";

const LEVEL_BAR_CLASS = {
  beginner: "bg-emerald-400",
  intermediate: "bg-amber-400",
  advanced: "bg-red-400",
};

export default function MatchCard({ match, onPress }) {
  const spotsLeft = getSpotsLeft(match);
  const barClass = LEVEL_BAR_CLASS[match.level] || "bg-emerald-400";

  return (
    <PressableScale
      onPress={onPress}
      scale={0.97}
      className="bg-white rounded-2xl p-4 mx-4 mb-4 shadow-md"
    >
      <View className={`h-1 rounded-full ${barClass} mb-3`} />

      <View className="flex-row items-center justify-between mb-2">
        <SkillBadge level={match.level} />
        <Text
          className={
            spotsLeft <= 2
              ? "text-xs font-semibold text-red-500"
              : "text-xs text-gray-400"
          }
        >
          {spotsLeft > 0 ? `残り${spotsLeft}枠` : "満員"}
        </Text>
      </View>

      <View className="flex-row items-start justify-between mb-3">
        <Text className="text-lg font-bold text-gray-900 flex-1 mr-2">
          {match.title}
        </Text>
        <View className="bg-emerald-50 px-2.5 py-0.5 rounded-lg">
          <Text className="text-base font-bold text-emerald-600">
            ¥{match.price.toLocaleString()}
          </Text>
        </View>
      </View>

      <View className="gap-1.5 mb-3">
        <View className="flex-row items-center gap-1.5">
          <MapPin size={14} color="#9ca3af" />
          <Text className="text-sm text-gray-500">{match.venue}</Text>
        </View>
        <View className="flex-row items-center gap-1.5">
          <Calendar size={14} color="#9ca3af" />
          <Text className="text-sm text-gray-500">
            {match.date}（{match.dayLabel}）
          </Text>
          <Clock size={14} color="#9ca3af" />
          <Text className="text-sm text-gray-500">
            {match.startTime}〜{match.endTime}
          </Text>
        </View>
      </View>

      <View className="h-px bg-gray-100 mb-3" />

      <ProgressBar current={match.currentPlayers} max={match.maxPlayers} />
    </PressableScale>
  );
}
