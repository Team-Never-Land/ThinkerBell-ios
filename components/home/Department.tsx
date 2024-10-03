import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { Color, Font } from "@/constants/Theme";
type DepartmentProps = {
  name: string; // 부서 이름 (부서별 연락처 or 부서별 홈페이지)
  onPress: () => void; // 눌렀을 때 페이지 이동을 위한 함수
};
export default function Department({ name, onPress }: DepartmentProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.label}>{name}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 312,
    height: 40,
    justifyContent: "center",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Color.red.gray[300],
    borderRadius: 4,
    paddingLeft: 17,
    marginBottom: -10,
  },
  label: {
    color: Color.BLACK,
    ...Font.Paragraph.Small,
  },
});
