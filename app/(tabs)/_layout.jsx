import { Tabs, router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Home, Plus, Bell, User } from "lucide-react-native";

function CreateTabButton(props) {
  return (
    <TouchableOpacity
      {...props}
      onPress={() => router.push("/create")}
      className="flex-1 items-center justify-center"
    >
      <View className="w-12 h-12 bg-emerald-600 rounded-2xl items-center justify-center shadow-lg">
        <Plus color="white" size={24} strokeWidth={2.5} />
      </View>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#059669",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarStyle: {
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          height: 68,
          borderRadius: 22,
          backgroundColor: "rgba(255,255,255,0.95)",
          borderWidth: 1,
          borderColor: "rgba(229,231,235,0.6)",
          borderTopWidth: 1,
          borderTopColor: "rgba(229,231,235,0.6)",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 20,
          elevation: 16,
          paddingBottom: 0,
          paddingTop: 0,
        },
        tabBarItemStyle: {
          paddingTop: 10,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          tabBarIcon: ({ color, focused }) => (
            <Home color={color} size={20} strokeWidth={focused ? 2.4 : 1.8} />
          ),
        }}
      />
      <Tabs.Screen
        name="create-placeholder"
        options={{
          title: "",
          tabBarButton: (props) => <CreateTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "通知",
          tabBarIcon: ({ color, focused }) => (
            <Bell color={color} size={20} strokeWidth={focused ? 2.4 : 1.8} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "マイページ",
          tabBarIcon: ({ color, focused }) => (
            <User color={color} size={20} strokeWidth={focused ? 2.4 : 1.8} />
          ),
        }}
      />
    </Tabs>
  );
}
