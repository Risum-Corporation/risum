import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Platform } from "react-native";

import { Profile } from "../pages/Drawer/Profile";
import { SavedMemes } from "../pages/Drawer/SavedMemes";
import { Settings } from "../pages/Drawer/Settings";

import { NavigationContainer } from "@react-navigation/native";

import TabRoutes from "./tab.routes"; // Bottom Tab
import { Drawer } from "../components/Drawer"; // Custom Drawer
import colors from "../styles/colors";

import StackContext from "../contexts/Stack";
import { Comments } from "../pages/Comments";
import { NoAccount } from "../pages/NoAccount";

const stackRoutes = createStackNavigator();
const drawerRoutes = createDrawerNavigator();

const drawerAndTabScreen = () => {
  // Theme
  const { isWhiteMode } = useContext(StackContext);

  return (
    <drawerRoutes.Navigator
      drawerContent={({ ...props }) => (
        <Drawer {...props} theme={isWhiteMode} />
      )}
      drawerStyle={{
        borderRadius: 30,
        height: Platform.OS === "ios" ? 310 : 350,
        marginTop: "45%",
      }}
    >
      <drawerRoutes.Screen
        name="Início"
        component={TabRoutes}
        options={{
          title: "Início",
          drawerIcon: ({ focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="shield-home"
                size={25}
                color={colors.white}
              />
            ) : (
              <MaterialCommunityIcons
                name="shield-home-outline"
                size={25}
                color={isWhiteMode ? colors.placeholderTextLight : colors.white}
              />
            ),
        }}
      />
      <drawerRoutes.Screen
        name="Perfil"
        component={Profile}
        options={{
          title: "Perfil",
          drawerIcon: ({ focused, size }) =>
            focused ? (
              <Ionicons
                name="ios-person-circle"
                size={size}
                color={colors.white}
              />
            ) : (
              <Ionicons
                name="ios-person-circle-outline"
                size={size}
                color={isWhiteMode ? colors.placeholderTextLight : colors.white}
              />
            ),
        }}
      />

      <drawerRoutes.Screen
        name="SavedMemes"
        component={SavedMemes}
        options={{
          title: "Memes Salvos",
          drawerIcon: ({ focused, size }) =>
            focused ? (
              <Ionicons name="bookmark" size={size} color={colors.white} />
            ) : (
              <Ionicons
                name="bookmark-outline"
                size={size}
                color={isWhiteMode ? colors.placeholderTextLight : colors.white}
              />
            ),
        }}
      />

      <drawerRoutes.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Configurações",
          drawerIcon: ({ focused, size }) =>
            focused ? (
              <Ionicons name="settings" size={size} color={colors.white} />
            ) : (
              <Ionicons
                name="settings-outline"
                size={size}
                color={isWhiteMode ? colors.placeholderTextLight : colors.white}
              />
            ),
        }}
      />
    </drawerRoutes.Navigator>
  );
};

const AppRoutes: React.FC = () => (
  <NavigationContainer independent={true}>
    <stackRoutes.Navigator headerMode="none">
      <stackRoutes.Screen
        name="DrawerAndTabsScreen"
        component={drawerAndTabScreen}
      />
      <stackRoutes.Screen name="Comments" component={Comments} />
      <stackRoutes.Screen name="NoAccount" component={NoAccount} />

    </stackRoutes.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
