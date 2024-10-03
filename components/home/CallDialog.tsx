import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Linking,
  TouchableWithoutFeedback,
} from "react-native";
import { Color, Font } from "@/constants/Theme";
import * as Clipboard from "expo-clipboard";

type CallDialogProps = {
  visible: boolean;
  onClose: () => void;
  categoryName: string;
  name: string;
  phone: string;
};

const CallDialog: React.FC<CallDialogProps> = ({
  visible,
  onClose,
  categoryName,
  name,
  phone,
}) => {
  // 전화번호 복사 함수
  const handleCopy = async () => {
    await Clipboard.setStringAsync(phone); // 비동기 클립보드 복사
    alert("전화번호가 복사되었습니다."); // iOS에서 alert 사용
  };

  // 전화걸기 함수
  const handleCall = () => {
    const phoneNumber = `tel:${phone}`;
    Linking.openURL(phoneNumber);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.dialog}>
              <View style={styles.content}>
                <Text style={styles.title}>
                  [{categoryName}] {name}
                </Text>
                <Text style={styles.phoneText}>{phone}</Text>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={handleCopy}>
                  <Text style={styles.buttonText}>복사하기</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleCall}>
                  <Text style={styles.buttonText}>전화걸기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    width: 304,
    height: 162,
    backgroundColor: Color.WHITE,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 5,
    alignItems: "center",
    paddingTop: 8,
  },
  content: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: 87,
  },
  title: {
    ...Font.Paragraph.Medium,
  },
  phoneText: {
    ...Font.Label.Medium,
    fontWeight: "600",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 10,
    width: 304,
    height: 67,
  },
  button: {
    width: 124,
    height: 42,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    ...Font.Label.Medium,
    color: Color.red.gray[400],
  },
});

export default CallDialog;
