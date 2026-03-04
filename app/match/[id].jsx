import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Banknote,
  ClipboardList,
  CheckCircle,
  ChevronRight,
} from "lucide-react-native";
import SkillBadge from "../../components/SkillBadge";
import ProgressBar from "../../components/ProgressBar";
import OrganizerCard from "../../components/OrganizerCard";
import ReviewCard from "../../components/ReviewCard";
import StickyButton from "../../components/StickyButton";
import { getMatchById } from "../../data/mock";

export default function MatchDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const match = getMatchById(id);
  const [joined, setJoined] = useState(false);

  if (!match) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-4xl mb-3">⚽</Text>
        <Text className="text-lg font-bold text-gray-900 mb-2">
          マッチが見つかりません
        </Text>
        <Text className="text-gray-400 text-center">
          このマッチは削除されたか{"\n"}
          存在しない可能性があります。
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      {/* Sticky Header */}
      <View
        className="flex-row items-center justify-between px-4 py-3 bg-white/90 border-b border-gray-200 z-10"
        style={{ paddingTop: insets.top + 4 }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center"
        >
          <ArrowLeft size={20} color="#111827" />
        </TouchableOpacity>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1">
        {/* Hero Section */}
        <View className="px-4 pt-5 pb-6">
          <View className="flex-row items-start justify-between gap-3 mb-3">
            <Text className="text-xl font-bold text-gray-900 leading-tight flex-1">
              {match.title}
            </Text>
            <SkillBadge level={match.level} />
          </View>
          <View className="flex-row items-center gap-2">
            <Calendar size={16} color="#059669" />
            <Text className="text-sm font-medium text-gray-900">
              {match.date}（{match.dayLabel}） {match.startTime}〜{match.endTime}
            </Text>
          </View>
        </View>

        {/* Info Cards */}
        <View className="px-4 gap-3">
          {/* Venue */}
          <View className="bg-white rounded-2xl border border-gray-200 p-4">
            <View className="flex-row items-start gap-3">
              <View className="w-10 h-10 rounded-xl bg-emerald-50 items-center justify-center">
                <MapPin size={20} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500 mb-1">会場</Text>
                <Text className="text-sm font-semibold text-gray-900">
                  {match.venue}
                </Text>
                <Text className="text-xs text-gray-500">{match.area}</Text>
              </View>
            </View>
          </View>

          {/* Fee */}
          <View className="bg-white rounded-2xl border border-gray-200 p-4">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-xl bg-emerald-50 items-center justify-center">
                <Banknote size={20} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500 mb-1">参加費</Text>
                <Text className="text-lg font-bold text-gray-900">
                  ¥{match.price.toLocaleString()}
                  <Text className="text-sm font-normal text-gray-500">
                    {" "}/ 人
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Capacity */}
          <View className="bg-white rounded-2xl border border-gray-200 p-4">
            <View className="flex-row items-center gap-3 mb-3">
              <View className="w-10 h-10 rounded-xl bg-emerald-50 items-center justify-center">
                <Users size={20} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500 mb-1">参加者</Text>
                <Text className="text-lg font-bold text-gray-900">
                  {match.currentPlayers}
                  <Text className="text-sm font-normal text-gray-500">
                    /{match.maxPlayers}人 参加中
                  </Text>
                </Text>
              </View>
            </View>
            <ProgressBar
              current={match.currentPlayers}
              max={match.maxPlayers}
            />
          </View>

          {/* Rules */}
          {match.rules.length > 0 && (
            <View className="bg-white rounded-2xl border border-gray-200 p-4">
              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-xl bg-emerald-50 items-center justify-center">
                  <ClipboardList size={20} color="#059669" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-500 mb-1">
                    ルール・持ち物
                  </Text>
                  <Text className="text-sm font-medium text-gray-900">
                    {match.rules.join("・")}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Organizer */}
        <View className="px-4 mt-6">
          <OrganizerCard host={match.host} />
        </View>

        {/* Description */}
        <View className="px-4 mt-6">
          <Text className="text-sm font-bold text-gray-900 mb-3">詳細</Text>
          <View className="bg-white rounded-2xl border border-gray-200 p-4">
            <Text className="text-sm text-gray-500 leading-relaxed">
              {match.description}
            </Text>
          </View>
        </View>

        {/* Reviews */}
        {match.reviews.length > 0 && (
          <View className="px-4 mt-6 mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-sm font-bold text-gray-900">レビュー</Text>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Text className="text-xs font-medium text-emerald-600">
                  すべて見る
                </Text>
                <ChevronRight size={16} color="#059669" />
              </TouchableOpacity>
            </View>
            <View className="gap-3">
              {match.reviews.map((review) => (
                <ReviewCard key={review.userId} review={review} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Joined confirmation */}
      {joined && (
        <View className="px-4 py-3 bg-emerald-50 flex-row items-center gap-2">
          <CheckCircle size={18} color="#059669" />
          <Text className="text-sm text-emerald-700 flex-1">
            参加確定！当日QRコードを提示してください
          </Text>
        </View>
      )}

      <StickyButton
        label={
          joined ? "参加済み" : `参加する（¥${match.price.toLocaleString()}）`
        }
        disabled={joined}
        onPress={() => setJoined(true)}
      />
    </View>
  );
}
