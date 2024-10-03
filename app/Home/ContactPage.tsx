import { View, Text } from "react-native";
import React from "react";
import ContactHeader from "@/components/home/header/ContactHeader";
import { useNavigation } from "expo-router";
import DepartmentDropDown from "@/components/home/DepartmentDropDown";

export default function ContactPage() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ContactHeader navigation={navigation} />
      <DepartmentDropDown />
    </View>
  );
}
