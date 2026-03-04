import { Text, TouchableOpacity } from "react-native";

/**
 * 選択式オプション
 * 選択/非選択状態を持つボタン型オプション
 */
export default function SelectOption({ label, value, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(value)}
      className={
        selected
          ? "flex-1 py-3 rounded-xl bg-emerald-600 items-center"
          : "flex-1 py-3 rounded-xl bg-gray-100 items-center"
      }
    >
      <Text
        className={
          selected
            ? "text-sm font-semibold text-white"
            : "text-sm text-gray-600"
        }
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
