import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import {
  X,
  Minus,
  Plus,
  Users,
  Banknote,
  CheckCircle,
} from "lucide-react-native";
import StickyButton from "../components/StickyButton";
import FocusInput from "../components/FocusInput";

function FormField({ label, children }) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-bold text-gray-900">{label}</Text>
      {children}
    </View>
  );
}

export default function CreateMatchScreen() {
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("19:00");
  const [endTime, setEndTime] = useState("21:00");
  const [level, setLevel] = useState("beginner");
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [autoApprove, setAutoApprove] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = title && venue && date && startTime && endTime && price;

  if (submitted) {
    return (
      <View
        className="flex-1 bg-white items-center justify-center px-8"
        style={{ paddingTop: insets.top }}
      >
        <View className="items-center gap-4">
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
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-4 py-3 bg-white/90 border-b border-gray-200"
        style={{ paddingTop: insets.top + 4 }}
      >
        <Text className="text-lg font-bold text-gray-900">マッチを作成</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center"
        >
          <X size={20} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ gap: 20, paddingVertical: 20 }}
      >
        <FormField label="タイトル">
          <FocusInput
            placeholder="渋谷エンジョイフットサル"
            placeholderTextColor="#9ca3af"
            value={title}
            onChangeText={setTitle}
          />
        </FormField>

        <FormField label="会場">
          <FocusInput
            placeholder="アディダス フットサルパーク 渋谷"
            placeholderTextColor="#9ca3af"
            value={venue}
            onChangeText={setVenue}
          />
        </FormField>

        <FormField label="日付">
          <FocusInput
            placeholder="2026-03-15"
            placeholderTextColor="#9ca3af"
            value={date}
            onChangeText={setDate}
          />
        </FormField>

        {/* Time */}
        <FormField label="時間">
          <View className="flex-row items-center gap-3">
            <View className="flex-1">
              <FocusInput
                placeholder="19:00"
                placeholderTextColor="#9ca3af"
                value={startTime}
                onChangeText={setStartTime}
              />
            </View>
            <Text className="text-gray-400 font-medium">-</Text>
            <View className="flex-1">
              <FocusInput
                placeholder="21:00"
                placeholderTextColor="#9ca3af"
                value={endTime}
                onChangeText={setEndTime}
              />
            </View>
          </View>
        </FormField>

        {/* Skill level - segmented control */}
        <FormField label="レベル">
          <View className="flex-row bg-gray-100 rounded-xl p-1 border border-gray-200">
            {[
              { id: "beginner", label: "初心者OK" },
              { id: "intermediate", label: "経験者" },
              { id: "advanced", label: "ガチ" },
            ].map((opt) => (
              <TouchableOpacity
                key={opt.id}
                onPress={() => setLevel(opt.id)}
                className={
                  level === opt.id
                    ? "flex-1 h-10 rounded-lg bg-emerald-600 items-center justify-center"
                    : "flex-1 h-10 rounded-lg items-center justify-center"
                }
              >
                <Text
                  className={
                    level === opt.id
                      ? "text-sm font-medium text-white"
                      : "text-sm font-medium text-gray-500"
                  }
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </FormField>

        {/* Capacity */}
        <FormField label="定員">
          <View className="flex-row items-center justify-between h-12 px-4 rounded-xl bg-gray-100 border border-gray-200">
            <View className="flex-row items-center gap-3">
              <Users size={20} color="#059669" />
              <Text className="text-gray-900 font-medium">
                {maxPlayers}人
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                onPress={() => setMaxPlayers(Math.max(4, maxPlayers - 1))}
                className="w-8 h-8 rounded-lg bg-white items-center justify-center"
              >
                <Minus size={16} color="#374151" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setMaxPlayers(Math.min(20, maxPlayers + 1))}
                className="w-8 h-8 rounded-lg bg-white items-center justify-center"
              >
                <Plus size={16} color="#374151" />
              </TouchableOpacity>
            </View>
          </View>
        </FormField>

        {/* Fee */}
        <FormField label="参加費">
          <View className="flex-row items-center bg-gray-100 border border-gray-200 rounded-xl px-4 h-12">
            <Banknote size={20} color="#059669" />
            <Text className="text-gray-900 font-medium ml-2">¥</Text>
            <FocusInput
              className="flex-1 ml-1 bg-transparent border-0"
              placeholder="1500"
              placeholderTextColor="#9ca3af"
              keyboardType="number-pad"
              value={price}
              onChangeText={setPrice}
            />
          </View>
        </FormField>

        {/* Rules / description */}
        <FormField label="ルール・備考">
          <FocusInput
            placeholder="ビブス持参不要、初心者歓迎！"
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            style={{ minHeight: 80 }}
            value={description}
            onChangeText={setDescription}
          />
        </FormField>

        {/* Approval method - segmented control */}
        <FormField label="承認方法">
          <View className="flex-row bg-gray-100 rounded-xl p-1 border border-gray-200">
            <TouchableOpacity
              onPress={() => setAutoApprove(true)}
              className={
                autoApprove
                  ? "flex-1 h-10 rounded-lg bg-emerald-600 items-center justify-center"
                  : "flex-1 h-10 rounded-lg items-center justify-center"
              }
            >
              <Text
                className={
                  autoApprove
                    ? "text-sm font-medium text-white"
                    : "text-sm font-medium text-gray-500"
                }
              >
                自動承認
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAutoApprove(false)}
              className={
                !autoApprove
                  ? "flex-1 h-10 rounded-lg bg-emerald-600 items-center justify-center"
                  : "flex-1 h-10 rounded-lg items-center justify-center"
              }
            >
              <Text
                className={
                  !autoApprove
                    ? "text-sm font-medium text-white"
                    : "text-sm font-medium text-gray-500"
                }
              >
                手動承認
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-xs text-gray-500 mt-1">
            {autoApprove
              ? "参加申請があると自動的に承認されます"
              : "参加申請を確認してから承認します"}
          </Text>
        </FormField>
      </ScrollView>

      <StickyButton
        label="作成する"
        disabled={!canSubmit}
        onPress={() => setSubmitted(true)}
      />
    </View>
  );
}
