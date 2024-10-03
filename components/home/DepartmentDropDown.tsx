import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { dummyDepartment } from "@/assets/data/dummyDepartment";
import { Color, Font } from "@/constants/Theme";
import DownIcon from "@/assets/images/icon/Arrow/Down2.svg";
import UpIcon from "@/assets/images/icon/Arrow/Up2.svg";
import CallDialog from "./CallDialog";

type DepartmentType = {
  id: number;
  name: string;
  phone: string;
};

export default function DepartmentDropDown() {
  const [selectedCampus, setSelectedCampus] = useState<number | null>(null); // 선택된 캠퍼스
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null
  ); // 선택된 하위 카테고리
  const [expanded, setExpanded] = useState<boolean>(false); // 드롭다운 상태
  const [selectedDepartment, setSelectedDepartment] = useState<{
    department: DepartmentType;
    categoryName: string;
  } | null>(null); // 선택된 학과와 상위 카테고리
  const [isDialogVisible, setDialogVisible] = useState(false); // 다이얼로그 표시 여부

  const toggleDropdown = (campusId: number) => {
    setSelectedCampus(campusId === selectedCampus ? null : campusId);
    setExpanded(campusId === selectedCampus ? false : true);
  };

  const toggleSubDropdown = (subCategoryId: number) => {
    setSelectedSubCategory(
      subCategoryId === selectedSubCategory ? null : subCategoryId
    );
  };

  // 학과 선택 시 다이얼로그 표시 함수
  const handleDepartmentSelect = (
    department: DepartmentType,
    categoryName: string
  ) => {
    setSelectedDepartment({ department, categoryName }); // 선택된 학과 설정
    setDialogVisible(true); // 다이얼로그 표시
  };

  return (
    <View>
      {/* Campus Dropdown */}
      {dummyDepartment.campuses.map((campus) => (
        <View key={campus.id}>
          <TouchableOpacity
            style={[
              styles.dropdownButton,
              expanded && selectedCampus === campus.id
                ? styles.dropdownButtonHover
                : {},
            ]}
            onPress={() => toggleDropdown(campus.id)}
          >
            <Text style={styles.dropdownText}>{campus.name}</Text>
            <View>
              {expanded && selectedCampus === campus.id ? (
                <UpIcon color={Color.red.gray[500]} />
              ) : (
                <DownIcon color={Color.red.gray[500]} />
              )}
            </View>
          </TouchableOpacity>

          {/* SubCategory Dropdown */}
          {selectedCampus === campus.id && expanded && (
            <View>
              {campus.subCategories.map((subCategory) => (
                <View key={subCategory.id}>
                  <TouchableOpacity
                    style={[
                      styles.dropdownButton,
                      selectedSubCategory === subCategory.id
                        ? styles.dropdownButtonHover
                        : {},
                    ]}
                    onPress={() => toggleSubDropdown(subCategory.id)}
                  >
                    <Text style={styles.dropdownText}>{subCategory.name}</Text>
                    <View>
                      {selectedSubCategory === subCategory.id ? (
                        <UpIcon color={Color.red.gray[500]} />
                      ) : (
                        <DownIcon color={Color.red.gray[500]} />
                      )}
                    </View>
                  </TouchableOpacity>

                  {/* Department List */}
                  {selectedSubCategory === subCategory.id && (
                    <FlatList
                      data={subCategory.departments}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.departmentItem}
                          onPress={() =>
                            handleDepartmentSelect(item, subCategory.name)
                          } // 학과 선택 시 다이얼로그 표시
                        >
                          <Text style={styles.departmentText}>{item.name}</Text>
                          <Text style={styles.departmentPhone}>
                            {item.phone}
                          </Text>
                        </TouchableOpacity>
                      )}
                    />
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      ))}

      {/* ContactDialog 표시 */}
      {selectedDepartment && (
        <CallDialog
          visible={isDialogVisible}
          categoryName={selectedDepartment.categoryName} // 상위 카테고리 이름 전달
          name={selectedDepartment.department.name} // 학과 이름 전달
          phone={selectedDepartment.department.phone} // 전화번호 전달
          onClose={() => setDialogVisible(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownButton: {
    height: 49,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 31,
    paddingLeft: 24,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: Color.red.gray[700],
  },
  dropdownButtonHover: {
    backgroundColor: "#E1E1E1",
  },
  dropdownText: {
    ...Font.Paragraph.Large,
  },
  departmentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 31,
    paddingLeft: 24,
    borderBottomWidth: 1,
    borderColor: Color.red.gray[700],
    height: 40,
  },
  departmentText: {
    ...Font.Paragraph.Medium,
  },
  departmentPhone: {
    fontFamily: "Pretendard",
    fontSize: 16,
    color: Color.contents.contentSecondary,
    textDecorationLine: "underline",
  },
});
