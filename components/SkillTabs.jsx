import { View, Text, TouchableOpacity } from "react-native";
import { LEVELS } from "../data/mock";

export default function SkillTabs({ selected, onSelect }) {
  return (
    <View className="px-4 pt-2 pb-1">
      <View className="flex-row bg-gray-100 rounded-xl p-1 border border-gray-200">
        {LEVELS.map((level) => (
          <TouchableOpacity
            key={level.key}
            onPress={() => onSelect(level.key)}
            className={
              selected === level.key
                ? "flex-1 py-2.5 rounded-lg bg-emerald-600 items-center"
                : "flex-1 py-2.5 rounded-lg items-center"
            }
            activeOpacity={0.7}
          >
            <Text
              className={
                selected === level.key
                  ? "text-xs font-bold text-white"
                  : "text-xs font-bold text-gray-500"
              }
            >
              {level.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
