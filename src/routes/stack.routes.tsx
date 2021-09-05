import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Platform } from "react-native";

import { Profile } from "../pages/Drawer/Profile";
import { SavedMemes } from "../pages/Drawer/SavedMemes";
import { Settings } from "../pages/Drawer/Settings";

import { NavigationContainer } from "@react-navigation/native";

import TabRoutes from "./tab.routes"; // Bottom Tab
import { Drawer } from "../components/Drawer"; // Custom Drawer
import colors from "../styles/colors";

const stackRoutes = createStackNavigator();
const drawerRoutes = createDrawerNavigator();

const drawerAndTabScreen = () => (
  <drawerRoutes.Navigator
    drawerContent={Drawer}
    drawerStyle={{
      borderRadius: 30,
      height: 410,
      marginTop: Platform.OS === 'ios' ? 50 : 10,
    }}
  >
    <drawerRoutes.Screen
      name="Início"
      component={TabRoutes}
      options={{
        title: "Início",
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="md-home"
            size={size}
            color={focused ? colors.white : colors.green}
          />
        ),
      }}
    />
    <drawerRoutes.Screen
      name="Perfil"
      component={Profile}
      options={{
        title: "Perfil",
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="ios-person-circle-outline"
            size={26}
            color={focused ? colors.white : colors.green}
          />
        ),
      }}
    />

    <drawerRoutes.Screen
      name="SavedMemes"
      component={SavedMemes}
      options={{
        title: "Memes Salvos",
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="bookmark"
            size={size}
            color={focused ? colors.white : colors.green}
          />
        ),
      }}
    />

    <drawerRoutes.Screen
      name="Settings"
      component={Settings}
      options={{
        title: "Configurações",
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="settings"
            size={size}
            color={focused ? colors.white : colors.green}
          />
        ),
    
      }}
    />
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
