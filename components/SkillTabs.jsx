import { View, Text, TouchableOpacity } from "react-native";
import { useColors } from "../contexts/ThemeContext";
import { LEVELS } from "../data/mock";

export default function SkillTabs({ selected, onSelect }) {
  const colors = useColors();

  return (
    <View className="px-4 pt-2 pb-1">
      <View
        className="flex-row rounded-xl p-1"
        style={{
          backgroundColor: colors.secondary,
          borderWidth: 1,
          borderColor: colors.border,
        }}
      >
        {LEVELS.map((level) => {
          const isActive = selected === level.key;
          return (
            <TouchableOpacity
              key={level.key}
              onPress={() => onSelect(level.key)}
              className="flex-1 py-2.5 rounded-lg items-center"
              style={isActive ? { backgroundColor: colors.primary } : undefined}
              activeOpacity={0.7}
            >
              <Text
                className="text-xs font-bold"
                style={{
                  color: isActive
                    ? colors.primaryForeground
                    : colors.mutedForeground,
                }}
              >
                {level.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
