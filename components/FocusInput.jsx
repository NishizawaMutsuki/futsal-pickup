import { useState } from "react";
import { TextInput } from "react-native";

export default function FocusInput({ className, ...props }) {
  const [focused, setFocused] = useState(false);

  const baseClass = focused
    ? "bg-white border-2 border-emerald-500 rounded-xl px-4 py-3 text-base text-gray-900"
    : "bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-900";

  return (
    <TextInput
      className={`${baseClass} ${className || ""}`}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...props}
    />
  );
}
