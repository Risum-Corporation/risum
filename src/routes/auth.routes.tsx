import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Welcome } from "../pages/Auth/Welcome";

import { RegisterStg1 } from "../pages/Auth/RegisterStg1";
import { RegisterStg2 } from "../pages/Auth/RegisterStg2";
import { ForgotPasswordStg1 } from "../pages/Auth/ForgotPasswordStg1";
import { ForgotPasswordStg2 } from "../pages/Auth/ForgotPasswordStg2";

import { Login } from "../pages/Auth/Login";

const AuthStack = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="Welcome" component={Welcome} />
    <AuthStack.Screen name="RegisterStg1" component={RegisterStg1} />
    <AuthStack.Screen name="RegisterStg2" component={RegisterStg2} />
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen
      name="ForgotPasswordStg1"
      component={ForgotPasswordStg1}
    />
    <AuthStack.Screen
      name="ForgotPasswordStg2"
      component={ForgotPasswordStg2}
    />
  </AuthStack.Navigator>
);

export default AuthRoutes;
