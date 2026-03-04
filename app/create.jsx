import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { X, Minus, Plus, CheckCircle } from "lucide-react-native";
import StickyButton from "../components/StickyButton";
import FocusInput from "../components/FocusInput";

function FormField({ label, children }) {
  return (
    <View className="gap-1.5">
      <Text className="text-sm font-semibold text-gray-900">{label}</Text>
      {children}
    </View>
  );
}

function LevelOption({ label, value, selected, onSelect }) {
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

export default function CreateMatchScreen() {
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [level, setLevel] = useState("beginner");
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [autoApprove, setAutoApprove] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (submitted) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          speed: 12,
          bounciness: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [submitted]);

  const canSubmit = title && venue && date && startTime && endTime && price;

  if (submitted) {
    return (
      <View
        className="flex-1 bg-white items-center justify-center px-8"
        style={{ paddingTop: insets.top }}
      >
        <Animated.View
          className="items-center gap-4"
          style={{
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <View className="w-20 h-20 bg-emerald-100 rounded-full items-center justify-center">
            <CheckCircle size={40} color="#059669" />
          </View>
          <Text className="text-xl font-bold text-gray-900">
            募集を公開しました！
          </Text>
          <Text className="text-gray-500 text-center">
            参加者が集まるのを待ちましょう。{"\n"}
            通知でお知らせします。
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="bg-emerald-600 px-8 py-3 rounded-xl mt-4"
          >
            <Text className="text-white font-semibold">閉じる</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <X size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-900">マッチを作成</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ gap: 20, paddingVertical: 20 }}>
        <FormField label="タイトル">
          <FocusInput
            placeholder="例: 渋谷エンジョイフットサル"
            placeholderTextColor="#9ca3af"
            value={title}
            onChangeText={setTitle}
          />
        </FormField>

        <FormField label="会場">
          <FocusInput
            placeholder="例: アディダス フットサルパーク 渋谷"
            placeholderTextColor="#9ca3af"
            value={venue}
            onChangeText={setVenue}
          />
        </FormField>

        <FormField label="日付">
          <FocusInput
            placeholder="例: 2026-03-15"
            placeholderTextColor="#9ca3af"
            value={date}
            onChangeText={setDate}
          />
        </FormField>

        <View className="flex-row gap-3">
          <View className="flex-1">
            <FormField label="開始時間">
              <FocusInput
                placeholder="19:00"
                placeholderTextColor="#9ca3af"
                value={startTime}
                onChangeText={setStartTime}
              />
            </FormField>
          </View>
          <View className="flex-1">
            <FormField label="終了時間">
              <FocusInput
                placeholder="21:00"
                placeholderTextColor="#9ca3af"
                value={endTime}
                onChangeText={setEndTime}
              />
            </FormField>
          </View>
        </View>

        <FormField label="レベル">
          <View className="flex-row gap-2">
            <LevelOption
              label="初心者OK"
              value="beginner"
              selected={level === "beginner"}
              onSelect={setLevel}
            />
            <LevelOption
              label="経験者"
              value="intermediate"
              selected={level === "intermediate"}
              onSelect={setLevel}
            />
            <LevelOption
              label="ガチ"
              value="advanced"
              selected={level === "advanced"}
              onSelect={setLevel}
            />
          </View>
        </FormField>

        <FormField label="定員">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity
              onPress={() => setMaxPlayers(Math.max(4, maxPlayers - 1))}
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
            >
              <Minus size={18} color="#374151" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-900 w-12 text-center">
              {maxPlayers}
            </Text>
            <TouchableOpacity
              onPress={() => setMaxPlayers(Math.min(20, maxPlayers + 1))}
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
            >
              <Plus size={18} color="#374151" />
            </TouchableOpacity>
            <Text className="text-sm text-gray-400">人</Text>
          </View>
        </FormField>

        <FormField label="参加費">
          <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border-2 border-transparent">
            <Text className="text-base text-gray-400 mr-1">¥</Text>
            <FocusInput
              className="flex-1"
              placeholder="1800"
              placeholderTextColor="#9ca3af"
              keyboardType="number-pad"
              value={price}
              onChangeText={setPrice}
            />
          </View>
        </FormField>

        <FormField label="説明">
          <FocusInput
            placeholder="マッチの雰囲気やルールを書きましょう"
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={{ minHeight: 100 }}
            value={description}
            onChangeText={setDescription}
          />
        </FormField>

        <View className="flex-row items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
          <View>
            <Text className="text-sm font-semibold text-gray-900">
              自動承認
            </Text>
            <Text className="text-xs text-gray-400 mt-0.5">
              参加リクエストを自動で承認します
            </Text>
          </View>
          <Switch
            value={autoApprove}
            onValueChange={setAutoApprove}
            trackColor={{ false: "#d1d5db", true: "#a7f3d0" }}
            thumbColor={autoApprove ? "#059669" : "#f4f4f5"}
          />
        </View>
      </ScrollView>

      <StickyButton
        label="募集を公開する"
        disabled={!canSubmit}
        onPress={() => setSubmitted(true)}
      />
    </View>
  );
}
