import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { ChevronRight, Calendar, MapPin } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import StatCard from "../../components/StatCard";
import ReviewCard from "../../components/ReviewCard";
import StarRating from "../../components/StarRating";
import { MY_PROFILE, getMatchById } from "../../data/mock";

function Avatar({ name, size = "lg" }) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
    : "?";

  const sizeClass =
    size === "lg"
      ? "w-20 h-20"
      : "w-9 h-9";
  const textClass =
    size === "lg"
      ? "text-2xl font-bold text-emerald-700"
      : "text-xs font-bold text-emerald-700";

  return (
    <View
      className={`${sizeClass} rounded-full bg-emerald-100 items-center justify-center`}
    >
      <Text className={textClass}>{initials}</Text>
    </View>
  );
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const hostedMatches = MY_PROFILE.hostedMatches
    .map(getMatchById)
    .filter(Boolean);

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Profile Header */}
        <View
          className="px-4 pb-6 items-center"
          style={{ paddingTop: insets.top + 16 }}
        >
          <Avatar name={MY_PROFILE.name} size="lg" />
          <Text className="text-xl font-bold text-gray-900 mt-3">
            {MY_PROFILE.name}
          </Text>
          <View className="flex-row items-center gap-2 mt-2">
            <StarRating rating={MY_PROFILE.rating} size={16} />
            <Text className="text-sm font-semibold text-gray-900">
              {MY_PROFILE.rating}
            </Text>
            <Text className="text-sm text-gray-500">
              ({MY_PROFILE.reviews.length}件)
            </Text>
          </View>
          <TouchableOpacity className="mt-4 px-5 py-2 rounded-xl border border-gray-200">
            <Text className="text-sm font-semibold text-gray-900">
              プロフィールを編集
            </Text>
          </TouchableOpacity>
        </View>

        <View className="px-4 gap-6">
          {/* Stats Row */}
          <View className="flex-row gap-3">
            <StatCard value={`${MY_PROFILE.matchCount}回`} label="参加数" />
            <StatCard value={`${MY_PROFILE.hostCount}回`} label="主催数" />
            <StatCard value={`${MY_PROFILE.cancelRate}%`} label="ドタキャン率" />
          </View>

          {/* Hosted matches */}
          {hostedMatches.length > 0 && (
            <View>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-sm font-bold text-gray-900">
                  主催したマッチ
                </Text>
                <TouchableOpacity className="flex-row items-center gap-1">
                  <Text className="text-xs font-medium text-emerald-600">
                    すべて見る
                  </Text>
                  <ChevronRight size={16} color="#059669" />
                </TouchableOpacity>
              </View>
              <View className="gap-3">
                {hostedMatches.map((match) => (
                  <TouchableOpacity
                    key={match.id}
                    onPress={() =>
                      router.push({
                        pathname: "/match/[id]",
                        params: { id: match.id },
                      })
                    }
                    className="bg-white rounded-2xl border border-gray-200 p-4"
                  >
                    <View className="flex-row items-start justify-between gap-3">
                      <View className="flex-1">
                        <Text className="text-sm font-bold text-gray-900">
                          {match.title}
                        </Text>
                        <View className="flex-row items-center gap-2 mt-2">
                          <Calendar size={14} color="#059669" />
                          <Text className="text-xs text-gray-500">
                            {match.date}（{match.dayLabel}） {match.startTime}〜
                            {match.endTime}
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-2 mt-1">
                          <MapPin size={14} color="#059669" />
                          <Text className="text-xs text-gray-500" numberOfLines={1}>
                            {match.venue}
                          </Text>
                        </View>
                      </View>
                      <ChevronRight size={20} color="#9ca3af" />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Reviews */}
          {MY_PROFILE.reviews.length > 0 && (
            <View>
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-sm font-bold text-gray-900">
                  レビュー
                </Text>
                <TouchableOpacity className="flex-row items-center gap-1">
                  <Text className="text-xs font-medium text-emerald-600">
                    すべて見る
                  </Text>
                  <ChevronRight size={16} color="#059669" />
                </TouchableOpacity>
              </View>
              <View className="gap-3">
                {MY_PROFILE.reviews.map((review) => (
                  <ReviewCard key={review.userId} review={review} />
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
