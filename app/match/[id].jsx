import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Banknote,
  CheckCircle,
} from "lucide-react-native";
import GradientHeader from "../../components/GradientHeader";
import SkillBadge from "../../components/SkillBadge";
import ProgressBar from "../../components/ProgressBar";
import OrganizerCard from "../../components/OrganizerCard";
import ReviewCard from "../../components/ReviewCard";
import StickyButton from "../../components/StickyButton";
import { getMatchById } from "../../data/mock";

function InfoItem({ icon, label, value }) {
  return (
    <View className="flex-1 bg-white rounded-2xl p-3 items-center gap-1 border border-gray-100">
      {icon}
      <Text className="text-xs text-gray-400">{label}</Text>
      <Text className="text-sm font-semibold text-gray-900">{value}</Text>
    </View>
  );
}

export default function MatchDetailScreen() {
  const { id } = useLocalSearchParams();
  const match = getMatchById(id);
  const [joined, setJoined] = useState(false);

  if (!match) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-gray-400">マッチが見つかりません</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView>
        <GradientHeader showBack>
          <View className="mt-3">
            <SkillBadge level={match.level} />
            <Text className="text-white text-2xl font-bold mt-2">
              {match.title}
            </Text>
            <Text className="text-emerald-100 text-sm mt-1">
              {match.venue}
            </Text>
          </View>
        </GradientHeader>

        <View className="px-4 py-4 gap-4">
          {/* Info grid */}
          <View className="flex-row gap-2">
            <InfoItem
              icon={<Calendar size={18} color="#059669" />}
              label="日程"
              value={`${match.date}（${match.dayLabel}）`}
            />
            <InfoItem
              icon={<Clock size={18} color="#059669" />}
              label="時間"
              value={`${match.startTime}〜${match.endTime}`}
            />
          </View>
          <View className="flex-row gap-2">
            <InfoItem
              icon={<Users size={18} color="#059669" />}
              label="定員"
              value={`${match.currentPlayers}/${match.maxPlayers}人`}
            />
            <InfoItem
              icon={<Banknote size={18} color="#059669" />}
              label="参加費"
              value={`¥${match.price.toLocaleString()}`}
            />
          </View>

          {/* Progress */}
          <View className="bg-white rounded-2xl p-4 border border-gray-100">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              参加状況
            </Text>
            <ProgressBar
              current={match.currentPlayers}
              max={match.maxPlayers}
            />
          </View>

          {/* Organizer */}
          <OrganizerCard host={match.host} />

          {/* Description */}
          <View className="bg-white rounded-2xl p-4 border border-gray-100">
            <Text className="text-sm font-semibold text-gray-700 mb-2">
              詳細
            </Text>
            <Text className="text-sm text-gray-600 leading-5">
              {match.description}
            </Text>
          </View>

          {/* Rules */}
          {match.rules.length > 0 && (
            <View className="bg-white rounded-2xl p-4 border border-gray-100">
              <Text className="text-sm font-semibold text-gray-700 mb-3">
                ルール
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {match.rules.map((rule) => (
                  <View
                    key={rule}
                    className="bg-gray-50 px-3 py-1.5 rounded-full"
                  >
                    <Text className="text-xs text-gray-600">{rule}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Reviews */}
          {match.reviews.length > 0 && (
            <View>
              <Text className="text-sm font-semibold text-gray-700 mb-3">
                レビュー（{match.reviews.length}件）
              </Text>
              <View className="gap-3">
                {match.reviews.map((review) => (
                  <ReviewCard key={review.userId} review={review} />
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Joined confirmation */}
      {joined && (
        <View className="px-4 py-3 bg-emerald-50 flex-row items-center gap-2 border-t border-emerald-100">
          <CheckCircle size={18} color="#059669" />
          <Text className="text-sm text-emerald-700 flex-1">
            参加確定！当日QRコードを提示してください
          </Text>
        </View>
      )}

      <StickyButton
        label={joined ? "参加済み" : `参加する（¥${match.price.toLocaleString()}）`}
        disabled={joined}
        onPress={() => setJoined(true)}
      />
    </View>
  );
}
