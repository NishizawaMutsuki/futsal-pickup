import { useState } from "react";
import { TextInput } from "react-native";
import { useColors } from "../contexts/ThemeContext";

export default function FocusInput({ style: propStyle, ...props }) {
  const colors = useColors();
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      className="rounded-xl px-4 py-3 text-base"
      style={[
        {
          backgroundColor: focused ? colors.card : colors.input,
          borderWidth: focused ? 2 : 1,
          borderColor: focused ? colors.primary + "80" : colors.border,
          color: colors.foreground,
        },
        propStyle,
      ]}
      placeholderTextColor={colors.mutedForeground}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
}
