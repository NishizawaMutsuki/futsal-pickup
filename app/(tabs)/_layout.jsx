import { Tabs, router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Home, Plus, Bell, User } from "lucide-react-native";
import { useColors } from "../../contexts/ThemeContext";

function CreateTabButton(props) {
  const colors = useColors();
  return (
    <TouchableOpacity
      {...props}
      onPress={() => router.push("/create")}
      className="flex-1 items-center justify-center"
    >
      <View
        className="w-12 h-12 rounded-2xl items-center justify-center"
        style={{
          backgroundColor: colors.primary,
          shadowColor: colors.primaryGlow,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 24,
          elevation: 8,
        }}
      >
        <Plus color={colors.primaryForeground} size={24} strokeWidth={2.5} />
      </View>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  const colors = useColors();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.navInactive,
        tabBarStyle: {
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          height: 68,
          borderRadius: 22,
          backgroundColor: colors.navBg,
          borderWidth: 1,
          borderColor: colors.navBorder,
          borderTopWidth: 1,
          borderTopColor: colors.navBorder,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
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
