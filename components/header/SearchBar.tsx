import React, { useEffect } from "react";
import { View, TextInput, Keyboard, Pressable } from "react-native";
import SearchIcon from "../../assets/images/icon/Topbar/Search.svg";
import { Color, Font } from "@/constants/Theme";
import Toast from "react-native-toast-message";

export default function SearchBar({
  search,
  setSearch,
  onSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (search: string) => void;
}) {
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        if (search.length < 2) {
          Toast.show({
            type: "success",
            text1: "2글자 이상 입력해주세요",
            position: "bottom",
            visibilityTime: 1000,
            autoHide: true,
          });
        }
      }
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, [search]);

  const handleSearch = () => {
    if (search.length >= 2) {
      onSearch(search);
      Keyboard.dismiss();
    }
  };

  const handleChangeText = (text: string) => {
    const filteredText = text.replace(/[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s]/g, "");
    setSearch(filteredText);
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
          onChangeText={handleChangeText}
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
    </View>
  );
}
