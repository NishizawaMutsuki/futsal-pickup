import { Tabs, router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Home, Plus, Bell, User } from "lucide-react-native";

function CreateTabButton(props) {
  return (
    <TouchableOpacity
      {...props}
      onPress={() => router.push("/create")}
      className="items-center justify-center -mt-5"
    >
      <View className="w-14 h-14 bg-emerald-600 rounded-full items-center justify-center shadow-lg">
        <Plus color="white" size={28} />
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
          borderTopWidth: 1,
          borderTopColor: "#f3f4f6",
          height: 85,
          paddingBottom: 25,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "ホーム",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="create-placeholder"
        options={{
          title: "作成",
          tabBarButton: (props) => <CreateTabButton {...props} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "通知",
          tabBarIcon: ({ color, size }) => <Bell color={color} size={size} />,
          tabBarBadge: 3,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "マイページ",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
