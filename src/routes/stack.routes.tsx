import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { HypeTrain } from "../pages/HypeTrain";
import { WolfPack } from "../pages/HyenaClan";
import { AddMeme } from "../pages/AddMeme";

import AuthRoutes from "./tab.routes"; // Bottom Tab
import { Profile } from "../pages/Profile";
import { Settings } from "../pages/Settings";
import { SavedMemes } from "../pages/SavedMemes";

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator headerMode="none">
    <stackRoutes.Screen name="Feed" component={AuthRoutes} />
    <stackRoutes.Screen name="HypeTrain" component={HypeTrain} />
    <stackRoutes.Screen name="WolfPack" component={WolfPack} />
    <stackRoutes.Screen name="AddMeme" component={AddMeme} />

    <stackRoutes.Screen name="Profile" component={Profile} />
    <stackRoutes.Screen name="Settings" component={Settings} />
    <stackRoutes.Screen name="SavedMemes" component={SavedMemes} />
  </stackRoutes.Navigator>
);

export default AppRoutes;
