import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Font } from "@/constants/Theme";

export default function KeywordBox({
  keyword,
  onKeywordSelect,
}: {
  keyword: string;
  onKeywordSelect?: (keyword: string) => void; // Callback to pass the selected keyword
}) {
  const containerWidth = keyword.length > 3 ? 75 + keyword.length * 4 : 75; // Adjust width based on the length of the keyword
  const textWidth = keyword.length > 3 ? 73 + keyword.length * 4 : 73;

  return (
    <Pressable
      style={[styles.keywordContainer, { width: containerWidth }]}
      onPress={() => {
        if (onKeywordSelect) {
          // onKeywordSelect가 존재할 때만 호출
          onKeywordSelect(keyword);
        }
      }} // Pass the keyword back to the parent when pressed
    >
      <View style={styles.keywordItem}>
        <Text style={[styles.keywordLabel, { width: textWidth }]}>
          {keyword}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  keywordContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E4E9EFC4",
    borderRadius: 100,
    height: 44,
    marginBottom: 18,
    marginRight: 6,
  },
  keywordItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  keywordLabel: {
    ...Font.Label.Medium,
    color: "#6B6B6B",
    textAlign: "center",
    height: 24,
  },
});
