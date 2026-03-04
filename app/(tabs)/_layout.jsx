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
      <View className="w-20 h-20 items-center justify-center">
        <View className="absolute w-20 h-20 bg-emerald-200 rounded-full opacity-50" />
        <View className="w-16 h-16 bg-emerald-600 rounded-full items-center justify-center shadow-xl">
          <Plus color="white" size={28} />
        </View>
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
          borderTopWidth: 0,
          height: 85,
          paddingBottom: 25,
          paddingTop: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.06,
          shadowRadius: 6,
          elevation: 8,
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
