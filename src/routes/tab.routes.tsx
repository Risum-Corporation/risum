// Usar essa toolbar caso a vontade de viver seja nula

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import colors from "../styles/colors";

import { Feed } from "../pages/Feed";
import { HypeTrain } from "../pages/HypeTrain";
import { WolfPack } from "../pages/WolfPack";
import { AddMeme } from "../pages/AddMeme";

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.white,
        labelPosition: "beside-icon",
        style: {
          paddingVertical: 20,
          height: 88,
        },
      }}
    >
      <AppTab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: () => (
            <AntDesign name="staro" size={24} color={colors.green} />
          ),
        }}
      />
      <AppTab.Screen
        name="HypeTrain"
        component={HypeTrain}
        options={{
          tabBarIcon: () => (
            <Ionicons name="train-outline" size={24} color={colors.green} />
          ),
        }}
      />
      <AppTab.Screen
        name="WolfPack"
        component={WolfPack}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account-group-outline"
              size={24}
              color={colors.green}
            />
          ),
        }}
      />
      <AppTab.Screen
        name="AddMeme"
        component={AddMeme}
        options={{
          tabBarIcon: () => (
            <Feather name="plus-circle" size={24} color={colors.green} />
          ),
        }}
      />
    </AppTab.Navigator>
  );
};

export default AuthRoutes;
