import React from "react";
import { View, Text, Pressable, StatusBar } from "react-native";
import MenuIcon from "../../assets/images/icon/Underbar/Menu.svg";
import HomeIcon from "../../assets/images/icon/Underbar/Home.svg";
import LogoIcon from "../../assets/images/icon/Logo.svg";
import { Color, Font } from "@/constants/Theme";
import SearchBar from "./SearchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";

export default function CategoryHeader({
  navigation,
  title,
  search,
  setSearch,
  onSearch,
}: {
  navigation: any;
  title: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (search: string) => void;
}) {
  const { top } = useSafeAreaInsets();

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content");

      return () => {};
    }, [])
  );

  return (
    <>
      <View style={{ height: top, backgroundColor: Color.BLUE }}></View>
      <StatusBar backgroundColor={Color.BLUE} barStyle="light-content" />
      <View
        style={{
          paddingTop: 20,
          backgroundColor: Color.BLUE,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            height: 32,
            paddingHorizontal: 17,
          }}
        >
          <Pressable
            onPress={() => navigation.navigate("CategoryList")}
            style={{
              height: "100%",
              justifyContent: "center",
              paddingHorizontal: 4,
            }}
          >
            <MenuIcon />
          </Pressable>
          <LogoIcon width={36} height={28} />
          <Pressable
            onPress={() => navigation.navigate("home")}
            style={{
              height: "100%",
              justifyContent: "center",
              paddingHorizontal: 4,
            }}
          >
            <HomeIcon />
          </Pressable>
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...Font.Label.XL,
              color: Color.WHITE,
              marginTop: 27,
              marginBottom: 14,
            }}
          >
            {title}
          </Text>
          <SearchBar
            search={search}
            setSearch={setSearch}
            onSearch={onSearch}
          />
        </View>
      </View>
    </>
  );
}
