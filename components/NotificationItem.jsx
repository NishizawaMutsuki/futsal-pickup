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

const TYPE_STYLE = {
  reminder: { bgClass: "bg-emerald-100", color: "#059669" },
  new_match: { bgClass: "bg-blue-100", color: "#3b82f6" },
  review: { bgClass: "bg-amber-100", color: "#d97706" },
  cancel: { bgClass: "bg-red-100", color: "#ef4444" },
  join: { bgClass: "bg-purple-100", color: "#8b5cf6" },
};

export default function NotificationItem({ notification, onPress }) {
  const config = NOTIFICATION_TYPES[notification.type] || NOTIFICATION_TYPES.reminder;
  const IconComponent = ICON_MAP[config.icon] || Clock;
  const style = TYPE_STYLE[notification.type] || TYPE_STYLE.reminder;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-start gap-3 p-4"
      style={{ opacity: notification.read ? 0.6 : 1 }}
      activeOpacity={0.7}
    >
      <View
        className={`w-10 h-10 rounded-full items-center justify-center ${style.bgClass}`}
      >
        <IconComponent size={20} color={style.color} />
      </View>
      <View className="flex-1">
        <View className="flex-row items-start justify-between gap-2">
          <Text
            className={
              notification.read
                ? "text-sm text-gray-900 flex-1"
                : "text-sm font-medium text-gray-900 flex-1"
            }
          >
            {notification.title}
          </Text>
          {!notification.read && (
            <View className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5" />
          )}
        </View>
        <Text className="text-sm text-gray-500 mt-0.5" numberOfLines={1}>
          {notification.message}
        </Text>
        <Text className="text-xs text-gray-400 mt-1">{notification.time}</Text>
      </View>
    </TouchableOpacity>
  );
}
