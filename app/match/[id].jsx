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
import { useColors } from "../../contexts/ThemeContext";
import SkillBadge from "../../components/SkillBadge";
import ProgressBar from "../../components/ProgressBar";
import OrganizerCard from "../../components/OrganizerCard";
import ReviewCard from "../../components/ReviewCard";
import StickyButton from "../../components/StickyButton";
import { getMatchById } from "../../data/mock";

export default function MatchDetailScreen() {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const { id } = useLocalSearchParams();
  const match = getMatchById(id);
  const [joined, setJoined] = useState(false);

  if (!match) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <Text className="text-4xl mb-3">⚽</Text>
        <Text
          className="text-lg font-bold mb-2"
          style={{ color: colors.foreground }}
        >
          マッチが見つかりません
        </Text>
        <Text
          className="text-center"
          style={{ color: colors.mutedForeground }}
        >
          このマッチは削除されたか{"\n"}
          存在しない可能性があります。
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Sticky Header */}
      <View
        className="flex-row items-center justify-between px-4 py-3 z-10"
        style={{
          paddingTop: insets.top + 4,
          backgroundColor: colors.background + "e6",
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-xl items-center justify-center"
          style={{ backgroundColor: colors.secondary }}
        >
          <ArrowLeft size={20} color={colors.foreground} />
        </TouchableOpacity>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1">
        {/* Hero Section */}
        <View className="px-4 pt-5 pb-6">
          <View className="flex-row items-start justify-between gap-3 mb-3">
            <Text
              className="text-xl font-bold leading-tight flex-1"
              style={{ color: colors.foreground }}
            >
              {match.title}
            </Text>
            <SkillBadge level={match.level} />
          </View>
          <View className="flex-row items-center gap-2">
            <Calendar size={16} color={colors.primary} />
            <Text
              className="text-sm font-medium"
              style={{ color: colors.foreground }}
            >
              {match.date}（{match.dayLabel}） {match.startTime}〜{match.endTime}
            </Text>
          </View>
        </View>

        {/* Info Cards */}
        <View className="px-4 gap-3">
          {/* Venue */}
          <View
            className="rounded-2xl p-4"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View className="flex-row items-start gap-3">
              <View
                className="w-10 h-10 rounded-xl items-center justify-center"
                style={{ backgroundColor: colors.primaryBg }}
              >
                <MapPin size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text
                  className="text-xs mb-1"
                  style={{ color: colors.mutedForeground }}
                >
                  会場
                </Text>
                <Text
                  className="text-sm font-semibold"
                  style={{ color: colors.foreground }}
                >
                  {match.venue}
                </Text>
                <Text
                  className="text-xs"
                  style={{ color: colors.mutedForeground }}
                >
                  {match.area}
                </Text>
              </View>
            </View>
          </View>

          {/* Fee */}
          <View
            className="rounded-2xl p-4"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View className="flex-row items-center gap-3">
              <View
                className="w-10 h-10 rounded-xl items-center justify-center"
                style={{ backgroundColor: colors.primaryBg }}
              >
                <Banknote size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text
                  className="text-xs mb-1"
                  style={{ color: colors.mutedForeground }}
                >
                  参加費
                </Text>
                <Text
                  className="text-lg font-bold"
                  style={{ color: colors.foreground }}
                >
                  ¥{match.price.toLocaleString()}
                  <Text
                    className="text-sm font-normal"
                    style={{ color: colors.mutedForeground }}
                  >
                    {" "}/ 人
                  </Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Capacity */}
          <View
            className="rounded-2xl p-4"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View className="flex-row items-center gap-3 mb-3">
              <View
                className="w-10 h-10 rounded-xl items-center justify-center"
                style={{ backgroundColor: colors.primaryBg }}
              >
                <Users size={20} color={colors.primary} />
              </View>
              <View className="flex-1">
                <Text
                  className="text-xs mb-1"
                  style={{ color: colors.mutedForeground }}
                >
                  参加者
                </Text>
                <Text
                  className="text-lg font-bold"
                  style={{ color: colors.foreground }}
                >
                  {match.currentPlayers}
                  <Text
                    className="text-sm font-normal"
                    style={{ color: colors.mutedForeground }}
                  >
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
            <View
              className="rounded-2xl p-4"
              style={{
                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <View className="flex-row items-center gap-3">
                <View
                  className="w-10 h-10 rounded-xl items-center justify-center"
                  style={{ backgroundColor: colors.primaryBg }}
                >
                  <ClipboardList size={20} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text
                    className="text-xs mb-1"
                    style={{ color: colors.mutedForeground }}
                  >
                    ルール・持ち物
                  </Text>
                  <Text
                    className="text-sm font-medium"
                    style={{ color: colors.foreground }}
                  >
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
          <Text
            className="text-sm font-bold mb-3"
            style={{ color: colors.foreground }}
          >
            詳細
          </Text>
          <View
            className="rounded-2xl p-4"
            style={{
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text
              className="text-sm leading-relaxed"
              style={{ color: colors.mutedForeground }}
            >
              {match.description}
            </Text>
          </View>
        </View>

        {/* Reviews */}
        {match.reviews.length > 0 && (
          <View className="px-4 mt-6 mb-6">
            <View className="flex-row items-center justify-between mb-3">
              <Text
                className="text-sm font-bold"
                style={{ color: colors.foreground }}
              >
                レビュー
              </Text>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Text
                  className="text-xs font-medium"
                  style={{ color: colors.primary }}
                >
                  すべて見る
                </Text>
                <ChevronRight size={16} color={colors.primary} />
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
        <View
          className="px-4 py-3 flex-row items-center gap-2"
          style={{ backgroundColor: colors.primaryBg }}
        >
          <CheckCircle size={18} color={colors.primary} />
          <Text className="text-sm flex-1" style={{ color: colors.primary }}>
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
