import { View, Text } from "react-native";
import { LEVELS } from "../data/mock";
import PressableScale from "./PressableScale";

export default function SkillTabs({ selected, onSelect }) {
  return (
    <View className="flex-row gap-2 px-4 py-3">
      {LEVELS.map((level) => (
        <PressableScale
          key={level.key}
          onPress={() => onSelect(level.key)}
          scale={0.95}
          className={
            selected === level.key
              ? "px-4 py-2 rounded-full bg-emerald-600"
              : "px-4 py-2 rounded-full bg-gray-100"
          }
        >
          <Text
            className={
              selected === level.key
                ? "text-sm font-semibold text-white"
                : "text-sm text-gray-600"
            }
          >
            {level.label}
          </Text>
        </PressableScale>
      ))}
    </View>
  );
}
