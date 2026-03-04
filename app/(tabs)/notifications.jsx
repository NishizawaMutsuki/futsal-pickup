import { View, Text, FlatList } from "react-native";
import { router } from "expo-router";
import GradientHeader from "../../components/GradientHeader";
import NotificationItem from "../../components/NotificationItem";
import { NOTIFICATIONS } from "../../data/mock";

export default function NotificationsScreen() {
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NotificationItem
            notification={item}
            onPress={() => {
              if (item.matchId) {
                router.push({
                  pathname: "/match/[id]",
                  params: { id: item.matchId },
                });
              }
            }}
          />
        )}
        ListHeaderComponent={() => (
          <GradientHeader
            title="通知"
            curveWhite
            subtitle={
              unreadCount > 0 ? `${unreadCount}件の未読` : "すべて既読です"
            }
          />
        )}
        ItemSeparatorComponent={() => (
          <View className="h-px bg-gray-100 ml-16" />
        )}
        ListEmptyComponent={() => (
          <View className="items-center py-16">
            <View className="w-24 h-24 bg-emerald-50 rounded-full items-center justify-center mb-4">
              <Text className="text-4xl">🔔</Text>
            </View>
            <Text className="text-lg font-bold text-gray-900 mb-2">
              通知はありません
            </Text>
            <Text className="text-gray-400 text-center">
              マッチの参加や新着情報があると{"\n"}
              こちらに通知が届きます。
            </Text>
          </View>
        )}
      />
    </View>
  );
}
