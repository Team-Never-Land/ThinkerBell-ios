import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritesPage from "../favorites/FavoritesPage";
import FavoritesNoticePage from "../favorites/FavoritesNoticePage";
import FavoritesSchedulePage from "../favorites/FavoritesSchedulePage";

const FavoriteStack = createNativeStackNavigator();

export default function Favorites() {
  return (
    <FavoriteStack.Navigator>
      <FavoriteStack.Screen
        name="Favorites"
        component={FavoritesPage}
        options={{ headerShown: false }}
      />
      <FavoriteStack.Screen
        name="FavoritesSchedule"
        component={FavoritesSchedulePage}
        options={{ headerShown: false }}
      />
      <FavoriteStack.Screen
        name="FavoritesNotice"
        component={FavoritesNoticePage}
        options={{ headerShown: false }}
      />
    </FavoriteStack.Navigator>
  );
}
