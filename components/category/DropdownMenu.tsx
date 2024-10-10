import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Down2Icon from "../../assets/images/icon/Arrow/Down2.svg";
import Up2Icon from "../../assets/images/icon/Arrow/Up2.svg";
import { Color, Font } from "@/constants/Theme";

export default function DropdownMenu({
  selectedCampus,
  handleSelectedCampus,
}: {
  selectedCampus: string;
  handleSelectedCampus: (campus: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const list = ["전체", "인문", "자연"];

  return (
    <View>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: 79,
          height: 29,
          alignItems: "center",
          backgroundColor: Color.WHITE,
          borderColor: Color.BLUE,
          borderWidth: 1,
          borderRadius: 5,
          paddingLeft: 9,
          paddingRight: 6,
        }}
      >
        <Text
          style={{
            ...Font.Label.Medium,
            color: Color.BLACK,
            flexShrink: 1,
          }}
        >
          {selectedCampus}
        </Text>
        {isOpen ? (
          <Up2Icon color={Color.red.gray[500]} />
        ) : (
          <Down2Icon color={Color.red.gray[500]} />
        )}
      </Pressable>
      {isOpen && (
        <View
          style={{
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.3,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          {list
            .filter((campus) => campus !== selectedCampus)
            .map((data, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    handleSelectedCampus(data);
                    setIsOpen(false);
                  }}
                  style={{
                    width: 79,
                    height: 35,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: Color.WHITE,
                    borderColor: Color.red.gray[200],
                    borderBottomWidth: index === 0 ? 0.5 : 0,
                  }}
                >
                  <Text
                    style={{
                      ...Font.Paragraph.Small,
                      color: Color.BLACK,
                    }}
                  >
                    {data}
                  </Text>
                </Pressable>
              );
            })}
        </View>
      )}
    </View>
  );
}
