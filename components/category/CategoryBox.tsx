import React from "react";
import { Pressable, Text } from "react-native";
import SpreadIcon from "../../assets/images/icon/Arrow/Spread.svg";
import { Color, Font } from "@/constants/Theme";

export default function CategoryBox({
  navigation,
  textKey,
  text,
  onLongPress,
}: {
  navigation: any;
  textKey: string;
  text: string;
  onLongPress: () => void;
}) {
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("CategorySearch", {
          categoryText: text,
          categoryKey: textKey,
        })
      }
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 22,
        height: 49,
        alignItems: "center",
        backgroundColor: Color.WHITE,
        borderColor: Color.red.gray[700],
        borderBottomWidth: 1,
      }}
    >
      <Text
        style={{
          ...Font.Category[14],
          color: Color.BLACK,
          flexShrink: 1,
        }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
      <Pressable
        style={{
          paddingHorizontal: 12,
          height: "100%",
          justifyContent: "center",
        }}
        onPress={onLongPress}
        onLongPress={onLongPress}
      >
        <SpreadIcon />
      </Pressable>
    </Pressable>
  );
}
