import React, { useState } from "react";
import { View, TextInput, Keyboard, Pressable, Text } from "react-native";
import SearchIcon from "../../assets/images/icon/Topbar/Search.svg";
import { Color, Font } from "@/constants/Theme";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (search: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isValidSearch = (text: string) => {
    const validText = /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{1,12}$/;
    return validText.test(text);
  };

  const handleSearch = () => {
    if (search.length < 2) {
      setErrorMessage("2글자 이상 작성해야합니다.");
    } else if (!isValidSearch(search)) {
      setErrorMessage("키워드를 정확하게 입력해주세요.");
    } else {
      onSearch(search);
      Keyboard.dismiss();
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#3661A3",
          borderRadius: 10,
          borderWidth: 1.2,
          borderColor: Color.WHITE,
          width: 282,
          height: 36,
          paddingRight: 12,
        }}
      >
        <TextInput
          style={{
            ...Font.Label.MediumInput,
            color: Color.WHITE,
            flexGrow: 1,
            paddingLeft: 17,
          }}
          onChangeText={(text) => {
            setSearch(text);
            setErrorMessage("");
          }}
          value={search}
          placeholder="검색어"
          placeholderTextColor={Color.WHITE}
          onSubmitEditing={handleSearch}
          maxLength={12}
        />
        <Pressable
          onPress={handleSearch}
          style={{
            height: "100%",
            justifyContent: "center",
            paddingHorizontal: 4,
          }}
        >
          <SearchIcon />
        </Pressable>
      </View>
      <Text
        style={{
          ...Font.Category[11],
          color: Color.RED,
          height: 17,
          marginBottom: 11,
          paddingVertical: 4,
          backfaceVisibility: errorMessage === "" ? "visible" : "hidden",
        }}
      >
        {errorMessage}
      </Text>
    </View>
  );
}
