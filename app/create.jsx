import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { X, Minus, Plus, CheckCircle } from "lucide-react-native";
import StickyButton from "../components/StickyButton";
import FormField from "../components/ui/FormField";
import SelectOption from "../components/ui/SelectOption";
import { COLORS, LEVELS } from "../data/constants";

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

  const canSubmit = title && venue && date && startTime && endTime && price;

  // レベル選択用オプション（"all"を除外）
  const levelOptions = [
    LEVELS.beginner,
    LEVELS.intermediate,
    LEVELS.advanced,
  ];

  if (submitted) {
    return (
      <View
        className="flex-1 bg-white items-center justify-center px-8"
        style={{ paddingTop: insets.top }}
      >
        <View className="items-center gap-4">
          <View className="w-20 h-20 bg-emerald-100 rounded-full items-center justify-center">
            <CheckCircle size={40} color={COLORS.primary} />
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
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <X size={24} color={COLORS.gray700} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-gray-900">マッチを作成</Text>
        <View className="w-6" />
      </View>

      <ScrollView className="flex-1 px-4" contentContainerStyle={{ gap: 20, paddingVertical: 20 }}>
        <FormField label="タイトル">
          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900"
            placeholder="例: 渋谷エンジョイフットサル"
            placeholderTextColor={COLORS.gray400}
            value={title}
            onChangeText={setTitle}
          />
        </FormField>

        <FormField label="会場">
          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900"
            placeholder="例: アディダス フットサルパーク 渋谷"
            placeholderTextColor={COLORS.gray400}
            value={venue}
            onChangeText={setVenue}
          />
        </FormField>

        <FormField label="日付">
          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900"
            placeholder="例: 2026-03-15"
            placeholderTextColor={COLORS.gray400}
            value={date}
            onChangeText={setDate}
          />
        </FormField>

        <View className="flex-row gap-3">
          <View className="flex-1">
            <FormField label="開始時間">
              <TextInput
                className="bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900"
                placeholder="19:00"
                placeholderTextColor={COLORS.gray400}
                value={startTime}
                onChangeText={setStartTime}
              />
            </FormField>
          </View>
          <View className="flex-1">
            <FormField label="終了時間">
              <TextInput
                className="bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900"
                placeholder="21:00"
                placeholderTextColor={COLORS.gray400}
                value={endTime}
                onChangeText={setEndTime}
              />
            </FormField>
          </View>
        </View>

        <FormField label="レベル">
          <View className="flex-row gap-2">
            {levelOptions.map((option) => (
              <SelectOption
                key={option.key}
                label={option.label}
                value={option.key}
                selected={level === option.key}
                onSelect={setLevel}
              />
            ))}
          </View>
        </FormField>

        <FormField label="定員">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity
              onPress={() => setMaxPlayers(Math.max(4, maxPlayers - 1))}
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
            >
              <Minus size={18} color={COLORS.gray700} />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-900 w-12 text-center">
              {maxPlayers}
            </Text>
            <TouchableOpacity
              onPress={() => setMaxPlayers(Math.min(20, maxPlayers + 1))}
              className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
            >
              <Plus size={18} color={COLORS.gray700} />
            </TouchableOpacity>
            <Text className="text-sm text-gray-400">人</Text>
          </View>
        </FormField>

        <FormField label="参加費">
          <View className="flex-row items-center bg-gray-50 rounded-xl px-4 py-3">
            <Text className="text-base text-gray-400 mr-1">¥</Text>
            <TextInput
              className="flex-1 text-base text-gray-900"
              placeholder="1800"
              placeholderTextColor={COLORS.gray400}
              keyboardType="number-pad"
              value={price}
              onChangeText={setPrice}
            />
          </View>
        </FormField>

        <FormField label="説明">
          <TextInput
            className="bg-gray-50 rounded-xl px-4 py-3 text-base text-gray-900"
            placeholder="マッチの雰囲気やルールを書きましょう"
            placeholderTextColor={COLORS.gray400}
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
            <Text className="text-sm font-semibold text-gray-700">
              自動承認
            </Text>
            <Text className="text-xs text-gray-400 mt-0.5">
              参加リクエストを自動で承認します
            </Text>
          </View>
          <Switch
            value={autoApprove}
            onValueChange={setAutoApprove}
            trackColor={{ false: COLORS.gray300, true: COLORS.primaryLight }}
            thumbColor={autoApprove ? COLORS.primary : "#f4f4f5"}
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
