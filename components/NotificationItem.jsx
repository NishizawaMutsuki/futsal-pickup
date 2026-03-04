import { View, Text, TouchableOpacity } from "react-native";
import {
  Clock,
  MapPin,
  Star,
  XCircle,
  UserPlus,
} from "lucide-react-native";
import { NOTIFICATION_TYPES } from "../data/constants";

const ICON_MAP = {
  Clock,
  MapPin,
  Star,
  XCircle,
  UserPlus,
};

export default function NotificationItem({ notification, onPress }) {
  const config = NOTIFICATION_TYPES[notification.type] || NOTIFICATION_TYPES.reminder;
  const IconComponent = ICON_MAP[config.icon] || Clock;

  const bgClass =
    notification.type === "new_match"
      ? "bg-blue-100"
      : notification.type === "review"
        ? "bg-amber-100"
        : notification.type === "cancel"
          ? "bg-red-100"
          : notification.type === "join"
            ? "bg-purple-100"
            : "bg-emerald-100";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={
        notification.read
          ? "flex-row items-start gap-3 px-4 py-4 bg-white"
          : "flex-row items-start gap-3 px-4 py-4 bg-emerald-50"
      }
    >
      <View
        className={`w-10 h-10 rounded-full items-center justify-center ${bgClass}`}
      >
        <IconComponent size={18} color={config.color} />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-semibold text-gray-900 text-sm">
            {notification.title}
          </Text>
          <Text className="text-xs text-gray-400">{notification.time}</Text>
        </View>
        <Text className="text-sm text-gray-500 mt-0.5">
          {notification.message}
        </Text>
      </View>
      {!notification.read && (
        <View className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
      )}
    </TouchableOpacity>
  );
}
