import { View, Text, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "../../contexts/ThemeContext";
import { router } from "expo-router";
import NotificationItem from "../../components/NotificationItem";
import { NOTIFICATIONS } from "../../data/mock";

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
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
            className="px-5 py-4"
            style={{
              paddingTop: insets.top + 8,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
              backgroundColor: colors.background + "f0",
            }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Text
                  className="text-xl font-bold"
                  style={{ color: colors.foreground }}
                >
                  通知
                </Text>
                {unreadCount > 0 && (
                  <View
                    className="px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Text
                      className="text-xs font-semibold"
                      style={{ color: colors.primaryForeground }}
                    >
                      {unreadCount}
                    </Text>
                  </View>
                )}
              </View>
              <Text
                className="text-sm font-medium"
                style={{ color: colors.primary }}
              >
                すべて既読
              </Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View
            className="h-px ml-16"
            style={{ backgroundColor: colors.border }}
          />
        )}
        ListEmptyComponent={() => (
          <View className="items-center py-16">
            <Text className="text-4xl mb-3">🔔</Text>
            <Text style={{ color: colors.mutedForeground }}>
              通知はありません
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
