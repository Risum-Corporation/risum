import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../styles/colors";

import { HypeTrain } from "../pages/HypeTrain";
import { WolfPack } from "../pages/WolfPack";
import { AddMeme } from "../pages/AddMeme";
import AuthRoutes from "./tab.routes"; // Bottom Tabbar

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.background,
      },
    }}
  >

    <stackRoutes.Screen name="Feed" component={AuthRoutes} />
    <stackRoutes.Screen name="HypeTrain" component={HypeTrain} />
    <stackRoutes.Screen name="WolfPack" component={WolfPack} />
    <stackRoutes.Screen name="AddMeme" component={AddMeme} />
  </stackRoutes.Navigator>
);

export default AppRoutes;
