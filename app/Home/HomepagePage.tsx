import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import HomePageHeader from "@/components/home/header/HomePageHeader";
import HomepageDropdown from "@/components/home/HomepageDropDown";

type Props = {};

const HomepagePage = (props: Props) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <HomePageHeader navigation={navigation} />
      <HomepageDropdown />
    </View>
  );
};

export default HomepagePage;
