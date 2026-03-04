import { View, Text, TouchableOpacity } from "react-native";
import {
  Clock,
  MapPin,
  Star,
  XCircle,
  UserPlus,
} from "lucide-react-native";
import { useColors } from "../contexts/ThemeContext";
import { NOTIFICATION_TYPES } from "../data/constants";

const ICON_MAP = { Clock, MapPin, Star, XCircle, UserPlus };

const TYPE_COLORS = {
  reminder: { bg: "#d1fae5", color: "#059669" },
  new_match: { bg: "#dbeafe", color: "#3b82f6" },
  review: { bg: "#fef3c7", color: "#d97706" },
  cancel: { bg: "#fee2e2", color: "#ef4444" },
  join: { bg: "#ede9fe", color: "#8b5cf6" },
};

export default function NotificationItem({ notification, onPress }) {
  const colors = useColors();
  const config = NOTIFICATION_TYPES[notification.type] || NOTIFICATION_TYPES.reminder;
  const IconComponent = ICON_MAP[config.icon] || Clock;
  const typeColor = TYPE_COLORS[notification.type] || TYPE_COLORS.reminder;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-start gap-3 p-4"
      style={{
        opacity: notification.read ? 0.6 : 1,
        backgroundColor: notification.read ? "transparent" : colors.primaryBg,
      }}
      activeOpacity={0.7}
    >
      <View
        className="w-10 h-10 rounded-full items-center justify-center"
        style={{ backgroundColor: typeColor.bg }}
      >
        <IconComponent size={20} color={typeColor.color} />
      </View>
      <View className="flex-1">
        <View className="flex-row items-start justify-between gap-2">
          <Text
            className="text-sm flex-1"
            style={{
              color: colors.foreground,
              fontWeight: notification.read ? "400" : "500",
            }}
          >
            {notification.title}
          </Text>
          {!notification.read && (
            <View
              className="w-2 h-2 rounded-full mt-1.5"
              style={{ backgroundColor: colors.primary }}
            />
          )}
        </View>
        <Text
          className="text-sm mt-0.5"
          numberOfLines={1}
          style={{ color: colors.mutedForeground }}
        >
          {notification.message}
        </Text>
        <Text
          className="text-xs mt-1"
          style={{ color: colors.mutedForeground + "99" }}
        >
          {notification.time}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
