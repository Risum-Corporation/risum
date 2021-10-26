import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { useContext } from "react";

import { Feed } from "../pages/Stack/Feed";
import { HypeTrain } from "../pages/Stack/HypeTrain";
import { HyenaClan } from "../pages/Stack/HyenaClan";
import { AddMeme } from "../pages/Stack/AddMeme";
import StackContext from "../contexts/Stack";
import { StyleSheet } from "react-native";
import AuthContext from "../contexts/Auth";
import colors from "../styles/colors";
import { NoAccount } from "../pages/Stack/NoAccount";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  // Theme
  const { isWhiteMode } = useContext(StackContext);

  const { isAnonymous } = useContext(AuthContext);

  return (
    <BottomTab.Navigator
      initialRouteName="HypeTrain"
      tabBarOptions={{
        activeTintColor: isWhiteMode ? colors.greenLight : colors.green,
        style: {
          backgroundColor: isWhiteMode
            ? colors.backgroundLight
            : colors.background,
          borderTopWidth: 0,
        },
      }}
    >
      {isAnonymous ? (
        <BottomTab.Screen
          name="Feed"
          component={NoAccount}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="rss-feed" size={37} color={color} />
            ),
          }}
        />
      ) : (
        <BottomTab.Screen
          name="Feed"
          component={Feed}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="rss-feed" size={37} color={color} />
            ),
          }}
        />
      )}

      <BottomTab.Screen
        name="HypeTrain"
        component={HypeTrain}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-train-sharp" color={color} />
          ),
        }}
      />
      {isAnonymous ? (
        <BottomTab.Screen
          name="Alcateia"
          component={NoAccount}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ios-people" color={color} />
            ),
          }}
        />
      ) : (
        <BottomTab.Screen
          name="Alcateia"
          component={HyenaClan}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ios-people" color={color} />
            ),
          }}
        />
      )}
      {isAnonymous ? (
        <BottomTab.Screen
          name="Postar"
          component={NoAccount}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ios-add-circle" color={color} />
            ),
          }}
        />
      ) : (
        <BottomTab.Screen
          name="Postar"
          component={AddMeme}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ios-add-circle" color={color} />
            ),
          }}
        />
      )}
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} {...props} />;
}

const styles = StyleSheet.create({
  tabbar: {},
});
