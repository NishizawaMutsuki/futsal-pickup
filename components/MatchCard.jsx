import { View, Text, TouchableOpacity } from "react-native";
import { MapPin, Calendar, Clock, Banknote } from "lucide-react-native";
import SkillBadge from "./SkillBadge";
import ProgressBar from "./ProgressBar";
import { getSpotsLeft } from "../data/mock";

export default function MatchCard({ match, onPress }) {
  const spotsLeft = getSpotsLeft(match);

  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-2xl p-4 mx-4 mb-3 border border-gray-100 shadow-sm"
      activeOpacity={0.7}
    >
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
        <Text className="text-base font-bold text-gray-900 flex-1 mr-2">
          {match.title}
        </Text>
        <Text className="text-base font-bold text-emerald-600">
          ¥{match.price.toLocaleString()}
        </Text>
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

      <ProgressBar current={match.currentPlayers} max={match.maxPlayers} />
    </TouchableOpacity>
  );
}
