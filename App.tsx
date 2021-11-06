import React, { useContext } from "react";
import { LogBox } from "react-native";
import Routes from "./src/routes";
import AppLoading from "expo-app-loading";
import AuthContext, { AuthProvider } from "./src/contexts/Auth";
import { StackProvider } from "./src/contexts/Stack";
import StackContext from "./src/contexts/Stack";

import {
  useFonts,
  Archivo_700Bold,
  Archivo_500Medium,
} from "@expo-google-fonts/archivo";

import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";

import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_700Bold,
    Archivo_500Medium,
    Poppins_400Regular,
    Roboto_400Regular,
    Poppins_600SemiBold,
  });
  const { loading } = useContext(AuthContext);
  if (!fontsLoaded || loading) {
    return <AppLoading />;
  }

  // Remove a Yellow Box do App
  LogBox.ignoreAllLogs(true);

  return (
    <NavigationContainer>
      <AuthProvider>
        <StackProvider>
          <Routes />
        </StackProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
