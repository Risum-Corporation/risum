import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Welcome } from "../pages/Auth/Welcome";

import { RegisterStg1 } from "../pages/Auth/RegisterStg1";
import { RegisterStg2 } from "../pages/Auth/RegisterStg2";
import { RegisterStg3 } from "../pages/Auth/RegisterStg3";

import { Login } from "../pages/Auth/Login";

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="Welcome" component={Welcome} />
    <AuthStack.Screen name="RegisterStg1" component={RegisterStg1} />
    <AuthStack.Screen name="RegisterStg2" component={RegisterStg2} />
    <AuthStack.Screen name="RegisterStg3" component={RegisterStg3} />
    <AuthStack.Screen name="Login" component={Login} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
