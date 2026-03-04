import { useRef } from "react";
import { Animated, Pressable } from "react-native";

export default function PressableScale({
  children,
  onPress,
  scale = 0.97,
  className,
  disabled,
  ...props
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: scale,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      {...props}
    >
      <Animated.View
        className={className}
        style={{ transform: [{ scale: scaleAnim }] }}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}
