import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import { Feed } from "../pages/Feed";
import { HypeTrain } from "../pages/HypeTrain";
import { WolfPack } from "../pages/HyenaClan";
import { AddMeme } from "../pages/AddMeme";
import SwitchMode from "../styles/SwitchMode";
import { StyleSheet } from "react-native";

import colors from "../styles/colors";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {

   // Theme
   let isSwitchOn = SwitchMode.isSwitchOn;

  return (
    <BottomTab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: isSwitchOn ? colors.greenLight : colors.green,
        style: {
          backgroundColor: isSwitchOn ? colors.backgroundLight : colors.background,
          borderTopWidth: 0,
        },
        
      }}
   
    >
      <BottomTab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="rss-feed" size={36} color={color}/>
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
  return <Ionicons size={30} {...props} />;
}

const styles = StyleSheet.create({
  tabbar: {
    
  }


});

