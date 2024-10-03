import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Linking,
} from "react-native";
import { dummyHomepage } from "@/assets/data/dummyHomepage"; // import the dummy data
import { Color, Font } from "@/constants/Theme";
import DownIcon from "@/assets/images/icon/Arrow/Down2.svg";
import UpIcon from "@/assets/images/icon/Arrow/Up2.svg";
import NextIcon from "@/assets/images/icon/Arrow/Next.svg";
type LinkType = {
  id: number;
  name: string;
  url: string;
};

type CategoryType = {
  id: number;
  name: string;
  links: LinkType[];
};

export default function HomepageDropdown() {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [selectedLinkId, setSelectedLinkId] = useState<number | null>(null); // 선택된 링크 상태 관리
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  ); // 선택된 카테고리 추적 상태

  const toggleDropdown = (categoryId: number) => {
    setExpandedCategory(categoryId === expandedCategory ? null : categoryId);
    setSelectedCategoryId(categoryId); // 카테고리 선택 상태 저장
  };

  const handleLinkPress = (id: number, url: string) => {
    setSelectedLinkId(id); // 클릭된 링크의 ID를 상태로 저장

    Linking.openURL(url); // Open the URL in the browser
  };

  return (
    <View>
      {/* Render categories */}
      {dummyHomepage.categories.map((category: CategoryType) => (
        <View key={category.id}>
          {/* Category Button */}
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              selectedCategoryId === category.id &&
                styles.selectedCategoryButton,
            ]}
            onPress={() => toggleDropdown(category.id)}
          >
            <Text style={styles.dropdownText}>{category.name}</Text>
            <View>
              {expandedCategory === category.id ? (
                <UpIcon color={Color.red.gray[500]} />
              ) : (
                <DownIcon color={Color.red.gray[500]} />
              )}
            </View>
          </TouchableOpacity>

          {/* Show links if category is expanded */}
          {expandedCategory === category.id && (
            <FlatList
              data={category.links}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.linkItem,
                    selectedLinkId === item.id && styles.selectedLinkItem, // 선택된 링크는 회색 배경 적용
                  ]}
                  onPress={() => handleLinkPress(item.id, item.url)}
                >
                  <Text style={styles.linkText}>{item.name}</Text>
                  <NextIcon color={Color.BLACK} />
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownButton: {
    height: 49,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 31,
    paddingLeft: 24,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: Color.red.gray[700],
  },
  dropdownText: {
    ...Font.Label.Large,
    color: Color.BLACK,
  },
  linkItem: {
    height: 44,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: Color.red.gray[700],
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 27,
    paddingLeft: 24,
  },
  linkText: {
    ...Font.Paragraph.Large,
    color: Color.BLACK,
  },
  selectedCategoryButton: {
    backgroundColor: "#E1E1E1",
  },
  selectedLinkItem: {
    backgroundColor: "#E1E1E1",
  },
});
