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
import { useColors } from "../contexts/ThemeContext";
import StickyButton from "../components/StickyButton";
import FocusInput from "../components/FocusInput";

function FormField({ label, colors, children }) {
  return (
    <View className="gap-2">
      <Text
        className="text-sm font-bold"
        style={{ color: colors.foreground }}
      >
        {label}
      </Text>
      {children}
    </View>
  );
}

export default function CreateMatchScreen() {
  const insets = useSafeAreaInsets();
  const colors = useColors();
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
        className="flex-1 items-center justify-center px-8"
        style={{
          backgroundColor: colors.background,
          paddingTop: insets.top,
        }}
      >
        <View className="items-center gap-4">
          <View
            className="w-20 h-20 rounded-full items-center justify-center"
            style={{ backgroundColor: colors.primaryBg }}
          >
            <CheckCircle size={40} color={colors.primary} />
          </View>
          <Text
            className="text-xl font-bold"
            style={{ color: colors.foreground }}
          >
            募集を公開しました！
          </Text>
          <Text
            className="text-center"
            style={{ color: colors.mutedForeground }}
          >
            参加者が集まるのを待ちましょう。{"\n"}
            通知でお知らせします。
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="px-8 py-3 rounded-xl mt-4"
            style={{ backgroundColor: colors.primary }}
          >
            <Text
              className="font-semibold"
              style={{ color: colors.primaryForeground }}
            >
              閉じる
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      {/* Header */}
      <View
        className="flex-row items-center justify-between px-4 py-3"
        style={{
          paddingTop: insets.top + 4,
          backgroundColor: colors.background + "e6",
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      >
        <Text
          className="text-lg font-bold"
          style={{ color: colors.foreground }}
        >
          マッチを作成
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-xl items-center justify-center"
          style={{ backgroundColor: colors.secondary }}
        >
          <X size={20} color={colors.foreground} />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 px-4"
        contentContainerStyle={{ gap: 20, paddingVertical: 20 }}
      >
        <FormField label="タイトル" colors={colors}>
          <FocusInput
            placeholder="渋谷エンジョイフットサル"
            value={title}
            onChangeText={setTitle}
          />
        </FormField>

        <FormField label="会場" colors={colors}>
          <FocusInput
            placeholder="アディダス フットサルパーク 渋谷"
            value={venue}
            onChangeText={setVenue}
          />
        </FormField>

        <FormField label="日付" colors={colors}>
          <FocusInput
            placeholder="2026-03-15"
            value={date}
            onChangeText={setDate}
          />
        </FormField>

        {/* Time */}
        <FormField label="時間" colors={colors}>
          <View className="flex-row items-center gap-3">
            <View className="flex-1">
              <FocusInput
                placeholder="19:00"
                value={startTime}
                onChangeText={setStartTime}
              />
            </View>
            <Text style={{ color: colors.mutedForeground }} className="font-medium">-</Text>
            <View className="flex-1">
              <FocusInput
                placeholder="21:00"
                value={endTime}
                onChangeText={setEndTime}
              />
            </View>
          </View>
        </FormField>

        {/* Skill level - segmented control */}
        <FormField label="レベル" colors={colors}>
          <View
            className="flex-row rounded-xl p-1"
            style={{
              backgroundColor: colors.secondary,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            {[
              { id: "beginner", label: "初心者OK" },
              { id: "intermediate", label: "経験者" },
              { id: "advanced", label: "ガチ" },
            ].map((opt) => (
              <TouchableOpacity
                key={opt.id}
                onPress={() => setLevel(opt.id)}
                className="flex-1 h-10 rounded-lg items-center justify-center"
                style={
                  level === opt.id
                    ? { backgroundColor: colors.primary }
                    : undefined
                }
              >
                <Text
                  className="text-sm font-medium"
                  style={{
                    color:
                      level === opt.id
                        ? colors.primaryForeground
                        : colors.mutedForeground,
                  }}
                >
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </FormField>

        {/* Capacity */}
        <FormField label="定員" colors={colors}>
          <View
            className="flex-row items-center justify-between h-12 px-4 rounded-xl"
            style={{
              backgroundColor: colors.secondary,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <View className="flex-row items-center gap-3">
              <Users size={20} color={colors.primary} />
              <Text
                className="font-medium"
                style={{ color: colors.foreground }}
              >
                {maxPlayers}人
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <TouchableOpacity
                onPress={() => setMaxPlayers(Math.max(4, maxPlayers - 1))}
                className="w-8 h-8 rounded-lg items-center justify-center"
                style={{ backgroundColor: colors.card }}
              >
                <Minus size={16} color={colors.foreground} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setMaxPlayers(Math.min(20, maxPlayers + 1))}
                className="w-8 h-8 rounded-lg items-center justify-center"
                style={{ backgroundColor: colors.card }}
              >
                <Plus size={16} color={colors.foreground} />
              </TouchableOpacity>
            </View>
          </View>
        </FormField>

        {/* Fee */}
        <FormField label="参加費" colors={colors}>
          <View
            className="flex-row items-center rounded-xl px-4 h-12"
            style={{
              backgroundColor: colors.secondary,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Banknote size={20} color={colors.primary} />
            <Text
              className="font-medium ml-2"
              style={{ color: colors.foreground }}
            >
              ¥
            </Text>
            <FocusInput
              className="flex-1 ml-1"
              style={{ backgroundColor: "transparent", borderWidth: 0 }}
              placeholder="1500"
              keyboardType="number-pad"
              value={price}
              onChangeText={setPrice}
            />
          </View>
        </FormField>

        {/* Rules / description */}
        <FormField label="ルール・備考" colors={colors}>
          <FocusInput
            placeholder="ビブス持参不要、初心者歓迎！"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
            style={{ minHeight: 80 }}
            value={description}
            onChangeText={setDescription}
          />
        </FormField>

        {/* Approval method - segmented control */}
        <FormField label="承認方法" colors={colors}>
          <View
            className="flex-row rounded-xl p-1"
            style={{
              backgroundColor: colors.secondary,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <TouchableOpacity
              onPress={() => setAutoApprove(true)}
              className="flex-1 h-10 rounded-lg items-center justify-center"
              style={
                autoApprove
                  ? { backgroundColor: colors.primary }
                  : undefined
              }
            >
              <Text
                className="text-sm font-medium"
                style={{
                  color: autoApprove
                    ? colors.primaryForeground
                    : colors.mutedForeground,
                }}
              >
                自動承認
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAutoApprove(false)}
              className="flex-1 h-10 rounded-lg items-center justify-center"
              style={
                !autoApprove
                  ? { backgroundColor: colors.primary }
                  : undefined
              }
            >
              <Text
                className="text-sm font-medium"
                style={{
                  color: !autoApprove
                    ? colors.primaryForeground
                    : colors.mutedForeground,
                }}
              >
                手動承認
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            className="text-xs mt-1"
            style={{ color: colors.mutedForeground }}
          >
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
