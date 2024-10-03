import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import CancelIcon from "../../assets/images/icon/Etc/Cancel.svg";
import { Font } from "@/constants/Theme";
export default function RecentSearch({
  search,
  onDelete,
}: {
  search: string;
  onDelete: () => void;
}) {
  const containerWidth = search.length > 5 ? 154 + search.length * 8 : 154; // 글자 수에 따라 너비 조정
  const textWidth = search.length > 5 ? 73 + search.length * 8 : 73;
  return (
    <View style={[styles.recentSearchContainer, { width: containerWidth }]}>
      <View style={styles.recentSearchItem}>
        <Text style={[styles.recentSearchLabel, { width: textWidth }]}>
          {search}
        </Text>
        <TouchableOpacity style={styles.cancelIcon} onPress={onDelete}>
          <CancelIcon width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recentSearchContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(228, 233, 239, 0.77)",
    borderRadius: 100,
    height: 44,
    marginBottom: 13,
  },
  recentSearchItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  recentSearchLabel: {
    ...Font.Label.Medium,
    color: "#6B6B6B",
    textAlign: "center",
    height: 24,
  },
  cancelIcon: {
    marginLeft: 10,
  },
});
