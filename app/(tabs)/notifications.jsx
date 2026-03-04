import { View, Text, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import NotificationItem from "../../components/NotificationItem";
import { NOTIFICATIONS } from "../../data/mock";

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
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
          <View
            className="px-5 py-4 border-b border-gray-200"
            style={{ paddingTop: insets.top + 8 }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Text className="text-xl font-bold text-gray-900">通知</Text>
                {unreadCount > 0 && (
                  <View className="px-2 py-0.5 rounded-full bg-emerald-600">
                    <Text className="text-xs font-semibold text-white">
                      {unreadCount}
                    </Text>
                  </View>
                )}
              </View>
              <Text className="text-sm font-medium text-emerald-600">
                すべて既読
              </Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View className="h-px bg-gray-100 ml-16" />
        )}
        ListEmptyComponent={() => (
          <View className="items-center py-16">
            <Text className="text-4xl mb-3">🔔</Text>
            <Text className="text-gray-400">通知はありません</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
