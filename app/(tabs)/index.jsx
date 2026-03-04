import { useState, useCallback } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { Search } from "lucide-react-native";
import { router } from "expo-router";
import GradientHeader from "../../components/GradientHeader";
import FilterChips from "../../components/FilterChips";
import SkillTabs from "../../components/SkillTabs";
import MatchCard from "../../components/MatchCard";
import { MATCHES } from "../../data/mock";

export default function HomeScreen() {
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
        <GradientHeader title="PickUp" subtitle="東京のフットサル仲間を見つけよう" large>
          <View className="flex-row items-center bg-white/20 rounded-xl px-3 py-2.5 mt-3">
            <Search size={18} color="white" />
            <TextInput
              className="flex-1 ml-2 text-white text-sm"
              placeholder="エリア・会場名で検索"
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <FilterChips selected={selectedArea} onSelect={setSelectedArea} />
        </GradientHeader>
        <SkillTabs selected={selectedLevel} onSelect={setSelectedLevel} />
      </View>
    ),
    [searchText, selectedArea, selectedLevel]
  );

  const renderEmpty = useCallback(
    () => (
      <View className="items-center py-16 px-4">
        <View className="w-24 h-24 bg-gray-100 rounded-full items-center justify-center mb-4">
          <Text className="text-4xl">🔍</Text>
        </View>
        <Text className="text-lg font-bold text-gray-900 mb-2">
          マッチが見つかりません
        </Text>
        <Text className="text-gray-400 text-center">
          条件に合うマッチが見つかりませんでした。{"\n"}
          フィルターを変更して再度お試しください。
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
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
