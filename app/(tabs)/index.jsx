import { useState, useCallback } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { Search, Flame } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import FilterChips from "../../components/FilterChips";
import SkillTabs from "../../components/SkillTabs";
import MatchCard from "../../components/MatchCard";
import { MATCHES } from "../../data/mock";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState("all");

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
        <View
          className="px-5 pb-3"
          style={{ paddingTop: insets.top + 8 }}
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-2.5">
              <View className="w-9 h-9 rounded-xl bg-emerald-600 items-center justify-center">
                <Text className="text-white font-bold text-sm">⚽</Text>
              </View>
              <View>
                <Text className="text-xl font-bold text-gray-900 leading-none">
                  Pick<Text className="text-emerald-600">Up</Text>
                </Text>
                <Text className="text-xs text-gray-400 tracking-widest mt-0.5">
                  FUTSAL MATCHING
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Search bar */}
        <View className="px-5 py-2">
          <View className="flex-row items-center bg-gray-100 border border-gray-200 rounded-xl px-3.5 h-11">
            <Search size={16} color="#9ca3af" />
            <TextInput
              className="flex-1 ml-2 text-sm text-gray-900"
              placeholder="エリア・会場名で検索..."
              placeholderTextColor="#9ca3af"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Area chips */}
        <FilterChips selected={selectedArea} onSelect={setSelectedArea} />

        {/* Skill tabs */}
        <SkillTabs selected={selectedLevel} onSelect={setSelectedLevel} />

        {/* Section header */}
        <View className="flex-row items-center justify-between px-5 pt-2 pb-3">
          <View className="flex-row items-center gap-2">
            <Flame size={16} color="#059669" />
            <Text className="text-sm font-bold text-gray-900">
              募集中のマッチ
            </Text>
            <View className="bg-emerald-50 px-2 py-0.5 rounded-md">
              <Text className="text-xs font-medium text-emerald-600">
                {filtered.length}件
              </Text>
            </View>
          </View>
        </View>
      </View>
    ),
    [searchText, selectedArea, selectedLevel, filtered.length, insets.top]
  );

  const renderEmpty = useCallback(
    () => (
      <View className="items-center py-16 px-4">
        <Text className="text-4xl mb-3">🔍</Text>
        <Text className="text-gray-400 text-center">
          条件に合うマッチが見つかりません
        </Text>
      </View>
    ),
    []
  );

  return (
    <View className="flex-1 bg-gray-50">
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
