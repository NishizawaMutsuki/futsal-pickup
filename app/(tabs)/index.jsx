import { useState, useCallback } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal } from "react-native";
import { Search, Flame, Palette, Check } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useTheme, useColors, THEMES } from "../../contexts/ThemeContext";
import FilterChips from "../../components/FilterChips";
import SkillTabs from "../../components/SkillTabs";
import MatchCard from "../../components/MatchCard";
import { MATCHES } from "../../data/mock";

const themeList = Object.values(THEMES);

function ThemePicker({ visible, onClose }) {
  const { theme, setTheme } = useTheme();
  const colors = useColors();

  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <TouchableOpacity
        className="flex-1"
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          className="absolute top-24 right-5 w-44 p-2 rounded-2xl"
          style={{
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 16 },
            shadowOpacity: 0.4,
            shadowRadius: 48,
            elevation: 20,
          }}
        >
          <Text
            className="text-xs font-bold uppercase tracking-wider px-2.5 pt-1 pb-2"
            style={{ color: colors.mutedForeground }}
          >
            テーマ
          </Text>
          {themeList.map((t) => (
            <TouchableOpacity
              key={t.name}
              onPress={() => {
                setTheme(t.name);
                onClose();
              }}
              className="flex-row items-center gap-3 w-full px-2.5 py-2.5 rounded-xl"
              style={
                theme === t.name
                  ? { backgroundColor: colors.primaryBg }
                  : undefined
              }
            >
              <View
                className="w-5 h-5 rounded-lg"
                style={{
                  backgroundColor: t.preview,
                  borderWidth: 2,
                  borderColor:
                    theme === t.name ? colors.primary : colors.border,
                }}
              />
              <Text
                className="flex-1 text-sm font-medium"
                style={{
                  color: theme === t.name ? colors.primary : colors.foreground,
                }}
              >
                {t.label}
              </Text>
              {theme === t.name && (
                <Check size={16} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [showThemePicker, setShowThemePicker] = useState(false);

  const filtered = MATCHES.filter(
    (m) =>
      (!searchText ||
        m.area.includes(searchText) ||
        m.venue.includes(searchText) ||
        m.title.includes(searchText)) &&
      (selectedLevel === "all" || m.level === selectedLevel) &&
      (!selectedArea || m.area === selectedArea)
  );

  const renderHeader = useCallback(
    () => (
      <View>
        {/* App Header */}
        <View className="px-5 pb-3" style={{ paddingTop: insets.top + 8 }}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2.5">
              <View
                className="w-9 h-9 rounded-xl items-center justify-center"
                style={{ backgroundColor: colors.primary }}
              >
                <Text
                  className="font-bold text-sm"
                  style={{ color: colors.primaryForeground }}
                >
                  ⚽
                </Text>
              </View>
              <View>
                <Text className="text-xl font-bold leading-none">
                  <Text style={{ color: colors.foreground }}>Pick</Text>
                  <Text style={{ color: colors.primary }}>Up</Text>
                </Text>
                <Text
                  className="text-xs tracking-widest mt-0.5"
                  style={{ color: colors.mutedForeground }}
                >
                  FUTSAL MATCHING
                </Text>
              </View>
            </View>

            <View className="flex-row items-center gap-2">
              {/* Theme switcher */}
              <TouchableOpacity
                onPress={() => setShowThemePicker(true)}
                className="w-10 h-10 rounded-xl items-center justify-center"
                style={{
                  backgroundColor: colors.secondary,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
              >
                <Palette size={18} color={colors.mutedForeground} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Search bar */}
        <View className="px-5 py-2">
          <View
            className="flex-row items-center rounded-xl px-3.5 h-11"
            style={{
              backgroundColor: colors.secondary,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Search size={16} color={colors.mutedForeground} />
            <TextInput
              className="flex-1 ml-2 text-sm"
              style={{ color: colors.foreground }}
              placeholder="エリア・会場名で検索..."
              placeholderTextColor={colors.mutedForeground}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        <FilterChips selected={selectedArea} onSelect={setSelectedArea} />
        <SkillTabs selected={selectedLevel} onSelect={setSelectedLevel} />

        {/* Section header */}
        <View className="flex-row items-center justify-between px-5 pt-2 pb-3">
          <View className="flex-row items-center gap-2">
            <Flame size={16} color={colors.primary} />
            <Text
              className="text-sm font-bold"
              style={{ color: colors.foreground }}
            >
              募集中のマッチ
            </Text>
            <View
              className="px-2 py-0.5 rounded-md"
              style={{ backgroundColor: colors.primaryBg }}
            >
              <Text
                className="text-xs font-medium"
                style={{ color: colors.primary }}
              >
                {filtered.length}件
              </Text>
            </View>
          </View>
        </View>
      </View>
    ),
    [searchText, selectedArea, selectedLevel, filtered.length, insets.top, colors, theme]
  );

  const renderEmpty = useCallback(
    () => (
      <View className="items-center py-16 px-4">
        <Text className="text-4xl mb-3">🔍</Text>
        <Text style={{ color: colors.mutedForeground }} className="text-center">
          条件に合うマッチが見つかりません
        </Text>
      </View>
    ),
    [colors]
  );

  return (
    <View className="flex-1" style={{ backgroundColor: colors.background }}>
      <ThemePicker
        visible={showThemePicker}
        onClose={() => setShowThemePicker(false)}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MatchCard
            match={item}
            onPress={() =>
              router.push({ pathname: "/match/[id]", params: { id: item.id } })
            }
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
