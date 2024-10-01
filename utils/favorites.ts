import Toast from "react-native-toast-message";

//즐겨찾기
export const onMarkedPress = (
  id: number,
  category: string,
  marked: boolean,
  updateList: (id: number) => void
) => {
  if (marked) {
    //이미 즐겨찾기된 경우 삭제
    removeFromFavorites(id, category, updateList);
  } else {
    //즐겨찾기가 아닌 경우 추가
    addToFavorites(id, category, updateList);
  }
};

//즐겨찾기 추가
const addToFavorites = (
  id: number,
  category: string,
  updateList: (id: number) => void
) => {
  Toast.show({
    type: "success",
    text1: "즐겨찾기 되었습니다!",
    position: "bottom",
    visibilityTime: 1500,
    autoHide: true,
  });

  console.log(category);
  updateList(id);
};

//즐겨찾기 삭제
const removeFromFavorites = (
  id: number,
  category: string,
  updateList: (id: number) => void
) => {
  Toast.show({
    type: "success",
    text1: "삭제 되었습니다.",
    position: "bottom",
    visibilityTime: 1500,
    autoHide: true,
  });

  console.log(category);
  updateList(id);
};
