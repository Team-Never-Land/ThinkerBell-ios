import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Color } from "@/constants/Theme";
import CategoryListPage from "../Category/CategoryListPage";
import CategorySearchPage from "../Category/CategorySearchPage";

const CategoryStack = createNativeStackNavigator();

export default function Category({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "CategorySearch") {
      navigation.setOptions({
        tabBarStyle: { display: "none" },
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: Color.WHITE,
          height: "auto",
          borderTopLeftRadius: 27,
          borderTopRightRadius: 27,
          position: "absolute",
          shadowColor: "rgba(186, 186, 186, 0.10)",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 2,
          display: "flex",
        },
      });
    }
  }, [navigation, route]);

  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen
        name="CategoryList"
        component={CategoryListPage}
        options={{ headerShown: false }}
      />
      <CategoryStack.Screen
        name="CategorySearch"
        component={CategorySearchPage}
        options={{ headerShown: false }}
      />
    </CategoryStack.Navigator>
  );
}
