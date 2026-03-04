import { ScrollView, Text, TouchableOpacity } from "react-native";
import { AREAS } from "../data/mock";

export default function FilterChips({ selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3"
      contentContainerStyle={{ gap: 8 }}
    >
      {AREAS.map((area) => (
        <TouchableOpacity
          key={area}
          onPress={() => onSelect(selected === area ? null : area)}
          className={
            selected === area
              ? "px-4 py-2 rounded-full bg-white"
              : "px-4 py-2 rounded-full bg-emerald-500/30"
          }
        >
          <Text
            className={
              selected === area
                ? "text-sm font-semibold text-emerald-700"
                : "text-sm text-white"
            }
          >
            {area}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
