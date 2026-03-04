import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Shield, QrCode, ChevronRight } from "lucide-react-native";
import { router } from "expo-router";
import GradientHeader from "../../components/GradientHeader";
import StatCard from "../../components/StatCard";
import ReviewCard from "../../components/ReviewCard";
import StarRating from "../../components/StarRating";
import { MY_PROFILE, getMatchById } from "../../data/mock";

export default function ProfileScreen() {
  const hostedMatches = MY_PROFILE.hostedMatches
    .map(getMatchById)
    .filter(Boolean);

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Profile Header */}
        <GradientHeader>
          <View className="items-center py-4">
            <View className="w-20 h-20 bg-white/20 rounded-full items-center justify-center mb-3">
              <Text className="text-4xl">{MY_PROFILE.avatar}</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <Text className="text-white text-xl font-bold">
                {MY_PROFILE.name}
              </Text>
              {MY_PROFILE.verified && (
                <Shield size={16} color="white" fill="rgba(255,255,255,0.3)" />
              )}
            </View>
            <View className="flex-row items-center gap-1 mt-1">
              <StarRating rating={MY_PROFILE.rating} size={14} />
              <Text className="text-emerald-100 text-sm ml-1">
                {MY_PROFILE.rating}
              </Text>
            </View>
          </View>
        </GradientHeader>

        <View className="px-4 py-4 gap-4">
          {/* Stats grid */}
          <View className="flex-row gap-3">
            <StatCard icon="⭐" value={MY_PROFILE.rating} label="評価" />
            <StatCard
              icon="🏟️"
              value={MY_PROFILE.matchCount}
              label="参加数"
            />
            <StatCard icon="🎯" value={MY_PROFILE.position} label="ポジション" />
            <StatCard
              icon="📊"
              value={`${MY_PROFILE.cancelRate}%`}
              label="キャンセル率"
            />
          </View>

          {/* QR Check-in */}
          <TouchableOpacity className="bg-white rounded-2xl p-4 flex-row items-center gap-3 border border-gray-100 shadow-sm">
            <View className="w-12 h-12 bg-emerald-100 rounded-xl items-center justify-center">
              <QrCode size={24} color="#059669" />
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-gray-900">
                QRチェックイン
              </Text>
              <Text className="text-xs text-gray-400 mt-0.5">
                会場でQRコードを提示してチェックイン
              </Text>
            </View>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          {/* Hosted matches */}
          {hostedMatches.length > 0 && (
            <View>
              <Text className="text-base font-bold text-gray-900 mb-3">
                主催したマッチ
              </Text>
              <View className="gap-2">
                {hostedMatches.map((match) => (
                  <TouchableOpacity
                    key={match.id}
                    onPress={() =>
                      router.push({
                        pathname: "/match/[id]",
                        params: { id: match.id },
                      })
                    }
                    className="bg-white rounded-2xl p-4 flex-row items-center border border-gray-100"
                  >
                    <View className="flex-1">
                      <Text className="font-semibold text-gray-900">
                        {match.title}
                      </Text>
                      <Text className="text-xs text-gray-400 mt-0.5">
                        {match.date}（{match.dayLabel}） {match.startTime}〜
                        {match.endTime}
                      </Text>
                      <Text className="text-xs text-emerald-600 mt-0.5">
                        {match.currentPlayers}/{match.maxPlayers}人参加
                      </Text>
                    </View>
                    <ChevronRight size={18} color="#9ca3af" />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Reviews */}
          {MY_PROFILE.reviews.length > 0 && (
            <View>
              <Text className="text-base font-bold text-gray-900 mb-3">
                もらったレビュー（{MY_PROFILE.reviews.length}件）
              </Text>
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
