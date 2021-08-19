import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import { Feed } from "../pages/Feed";
import { HypeTrain } from "../pages/HypeTrain";
import { WolfPack } from "../pages/WolfPack";
import { AddMeme } from "../pages/AddMeme";

import colors from "../styles/colors";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: colors.green,
        style: {backgroundColor: '#1B1A1A',  borderTopWidth: 0}
       
      }}
    >
      <BottomTab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="HypeTrain"
        component={HypeTrain}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-train-sharp" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Alcateia"
        component={WolfPack}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-people" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Postar"
        component={AddMeme}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-add-circle" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
