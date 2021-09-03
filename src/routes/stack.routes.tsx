import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Profile } from "../pages/Drawer/Profile";
import { SavedMemes } from "../pages/Drawer/SavedMemes";
import { Settings } from "../pages/Drawer/Settings";

import { NavigationContainer } from "@react-navigation/native";

import TabRoutes from "./tab.routes"; // Bottom Tab
import { Drawer } from "../components/Drawer"; // Custom Drawer

const stackRoutes = createStackNavigator();
const drawerRoutes = createDrawerNavigator();

const drawerAndTabScreen = () => (
  <drawerRoutes.Navigator drawerContent={Drawer}>
    <drawerRoutes.Screen name="Início" component={TabRoutes} />
    <drawerRoutes.Screen name="Perfil" component={Profile} />
    <drawerRoutes.Screen name="Memes Salvos" component={SavedMemes} />
    <drawerRoutes.Screen name="Configurações" component={Settings} />
  </drawerRoutes.Navigator>
);

const AppRoutes: React.FC = () => (
  <NavigationContainer independent={true}>
    <stackRoutes.Navigator headerMode="none">
      <stackRoutes.Screen
        name="DrawerAndTabsScreen"
        component={drawerAndTabScreen}
      />
      <stackRoutes.Screen name="Profile" component={Profile} />
    </stackRoutes.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
