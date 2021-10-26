import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Profile } from "../pages/Drawer/Profile";
import { SavedMemes } from "../pages/Drawer/SavedMemes";
import { Settings } from "../pages/Drawer/Settings/Settings";

import { NavigationContainer } from "@react-navigation/native";

import TabRoutes from "./tab.routes"; // Bottom Tab
import { Drawer } from "../components/Drawer"; // Custom Drawer
import colors from "../styles/colors";

import StackContext from "../contexts/Stack";
import { Comments } from "../pages/Stack/Comments";
import { NoAccount } from "../pages/Stack/NoAccount";
import { ProfileSettings } from "../pages/Drawer/Settings/Profile/ProfileSettings";
import { SecuritySettings } from "../pages/Drawer/Settings/Security/SecuritySettings";
import { AboutUsSettings } from "../pages/Drawer/Settings/AboutUsSettings";
import { RisumPoliciesSettings } from "../pages/Drawer/Settings/RisumPoliciesSettings";
import AuthContext from "../contexts/Auth";
import { Search } from "../pages/Stack/Search";
import { ChangeAvatar } from "../pages/Drawer/Settings/Profile/ChangeAvatar";
import { ForgotPasswordStg1 } from "../pages/Auth/ForgotPasswordStg1";
import { ForgotPasswordStg2 } from "../pages/Auth/ForgotPasswordStg2";

const stackRoutes = createStackNavigator();
const drawerRoutes = createDrawerNavigator();

const drawerAndTabScreen = () => {
  // Theme
  const { isWhiteMode } = useContext(StackContext);

  const { isAnonymous } = useContext(AuthContext);

  return (
    <drawerRoutes.Navigator
      drawerContent={({ ...props }) => (
        <Drawer {...props} theme={isWhiteMode} />
      )}
      drawerStyle={{
        borderRadius: 30,
        marginVertical: "50%",
        height: 270,
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
      {isAnonymous ? (
        <drawerRoutes.Screen
          name="Perfil"
          component={NoAccount}
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
                  color={
                    isWhiteMode ? colors.placeholderTextLight : colors.white
                  }
                />
              ),
          }}
        />
      ) : (
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
                  color={
                    isWhiteMode ? colors.placeholderTextLight : colors.white
                  }
                />
              ),
          }}
        />
      )}

      {isAnonymous ? (
        <drawerRoutes.Screen
          name="SavedMemes"
          component={NoAccount}
          options={{
            title: "Memes Salvos",
            drawerIcon: ({ focused, size }) =>
              focused ? (
                <Ionicons name="bookmark" size={size} color={colors.white} />
              ) : (
                <Ionicons
                  name="bookmark-outline"
                  size={size}
                  color={
                    isWhiteMode ? colors.placeholderTextLight : colors.white
                  }
                />
              ),
          }}
        />
      ) : (
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
                  color={
                    isWhiteMode ? colors.placeholderTextLight : colors.white
                  }
                />
              ),
          }}
        />
      )}

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

      {/*  Settings */}

      <stackRoutes.Screen name="ProfileSettings" component={ProfileSettings} />
      <stackRoutes.Screen name="ChangeAvatar" component={ChangeAvatar} />

      <stackRoutes.Screen
        name="SecuritySettings"
        component={SecuritySettings}
      />
      <stackRoutes.Screen name="AboutUsSettings" component={AboutUsSettings} />
      <stackRoutes.Screen name="Search" component={Search} />

      
      <stackRoutes.Screen name="ChangePassword" component={ForgotPasswordStg1} />
      <stackRoutes.Screen name="ForgotPasswordStg2" component={ForgotPasswordStg2} />
      <stackRoutes.Screen name="Welcome" component={drawerAndTabScreen} />



      <stackRoutes.Screen
        name="RisumPoliciesSettings"
        component={RisumPoliciesSettings}
      />
    </stackRoutes.Navigator>
  </NavigationContainer>
);

export default AppRoutes;
