import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useColors } from "../contexts/ThemeContext";
import { AREAS } from "../data/mock";

const ALL_AREAS = ["すべて", ...AREAS];

export default function FilterChips({ selected, onSelect }) {
  const colors = useColors();

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
            className="px-4 py-2 rounded-xl"
            style={{
              backgroundColor: isSelected ? colors.primary : colors.secondary,
              borderWidth: 1,
              borderColor: isSelected ? colors.primary : colors.border,
            }}
            activeOpacity={0.7}
          >
            <Text
              className="text-xs font-semibold"
              style={{
                color: isSelected
                  ? colors.primaryForeground
                  : colors.mutedForeground,
              }}
            >
              {area}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
