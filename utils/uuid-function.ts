import "react-native-get-random-values";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

export async function getOrCreateUUID() {
  try {
    //console.log("Attempting to retrieve UUID from AsyncStorage...");

    // AsyncStorage에서 UUID 가져오기
    let storedUUID = await AsyncStorage.getItem("device-uuid");

    if (!storedUUID) {
      console.log("No UUID found, generating a new one...");
      // UUID가 없으면 새로 생성 (number[] 타입일 가능성 처리)
      const newUUID = uuid.v4();
      const stringUUID = Array.isArray(newUUID) ? newUUID.join("") : newUUID; // number[]일 경우 문자열로 변환
      console.log("Generated UUID:", stringUUID);

      // AsyncStorage에 저장
      await AsyncStorage.setItem("device-uuid", stringUUID);
      //console.log("UUID saved to AsyncStorage");
      storedUUID = stringUUID;
    } else {
      //console.log("UUID found in AsyncStorage:", storedUUID);
    }

    return storedUUID;
  } catch (error) {
    console.error("Error while getting or creating UUID:", error);
    throw error;
  }
}
