import { View, Text, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { Color, Font } from "@/constants/Theme";
import SettingUsableHeader from "@/components/header/SettingUsableHeader";
import Toast from "react-native-toast-message";

export default function Error({ navigation }: { navigation: any }) {
  const title = "오류신고";
  const [errorText, setErrorText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleValidation = () => {
    if (errorText.length < 10) {
      setErrorMessage("열 글자 이상 입력해주세요.");
    } else {
      setErrorMessage("");
      handleSubmit();
    }
  };

  // 신고 내용 제출
  const handleSubmit = () => {
    Toast.show({
      type: "success",
      text1: "신고되었습니다!",
      position: "bottom",
    });
    setErrorText(""); // 입력 필드 초기화
    console.log(errorText);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.WHITE,
      }}
    >
      <SettingUsableHeader
        navigation={navigation}
        name={title}
        disablePress={true}
      />
      <Pressable
        style={{
          position: "absolute",
          marginTop: 57,
          marginLeft: 29,
        }}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text
          style={{
            fontFamily: "Pretendard",
            color: Color.WHITE,
            fontSize: 14,
          }}
        >
          닫기
        </Text>
      </Pressable>
      <View
        style={{
          marginTop: 245,
          left: 24,
          position: "absolute",
        }}
      >
        <Text
          style={{
            fontFamily: "Pretendard",
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          내용입력
        </Text>
      </View>
      <View
        style={{
          alignSelf: "center",
          marginTop: 87,
        }}
      >
        <TextInput
          style={{
            width: 312,
            height: 234,
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#E4E9EFC2",
            fontFamily: "Pretendard",
            fontSize: 14,
            textAlignVertical: "top",
          }}
          placeholder="어떤 오류가 발생했나요?"
          maxLength={200}
          multiline
          value={errorText}
          onChangeText={(text) => setErrorText(text)}
        />
        {errorMessage ? (
          <Text
            style={{
              color: "red",
              fontSize: 12,
              marginTop: 8,
              fontFamily: "Pretendard",
              position: "absolute",
              top: 239,
            }}
          >
            {errorMessage}
          </Text>
        ) : null}
      </View>

      <Pressable
        style={{
          backgroundColor: Color.BLUE,
          width: 178,
          height: 56,
          borderWidth: 2,
          borderColor: "#E4E9EF",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          marginTop: 604,
          alignSelf: "center",
        }}
        onPress={handleValidation}
      >
        <Text
          style={{
            ...Font.Heading.Medium,
            color: Color.WHITE,
          }}
        >
          신고하기
        </Text>
      </Pressable>
    </View>
  );
}
