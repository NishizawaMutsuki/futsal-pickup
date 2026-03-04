import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { AREAS } from "../data/mock";

const ALL_AREAS = ["すべて", ...AREAS];

export default function FilterChips({ selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="px-4 py-2"
      contentContainerStyle={{ gap: 8 }}
    >
      {ALL_AREAS.map((area) => {
        const isSelected =
          area === "すべて" ? selected === null : selected === area;
        return (
          <TouchableOpacity
            key={area}
            onPress={() =>
              onSelect(area === "すべて" ? null : area === selected ? null : area)
            }
            className={
              isSelected
                ? "px-4 py-2 rounded-xl bg-emerald-600 border border-emerald-600"
                : "px-4 py-2 rounded-xl bg-gray-100 border border-gray-200"
            }
            activeOpacity={0.7}
          >
            <Text
              className={
                isSelected
                  ? "text-xs font-semibold text-white"
                  : "text-xs font-semibold text-gray-500"
              }
            >
              {area}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
