import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import StackRoutes from "./stack.routes";


import { Settings } from "../pages/Settings";
import { SavedMemes } from "../pages/SavedMemes";
import { Profile } from "../pages/Profile";
import BottomTabNavigator from "./tab.routes";

const Drawer = createDrawerNavigator();
export default function DrawerRoutes() {

    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="Main" component={BottomTabNavigator} /> {/* Eu acredito que raciocínio para fazer o Drawer funcionar com a BottomTab é por aí, boa sorte 🙏😄*/}
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="SavedMemes" component={SavedMemes} />
                <Drawer.Screen name="Settings" component={Settings} />

            </Drawer.Navigator>
        </NavigationContainer>
    );
}