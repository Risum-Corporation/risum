import React from "react";
import Routes from "./src/routes";
import AppLoading from "expo-app-loading";
import { AuthProvider } from "./src/contexts/Auth";
import { StatusBar } from "react-native";
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
import colors from "./src/styles/colors";

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_700Bold,
    Archivo_500Medium,
    Poppins_400Regular,
    Roboto_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
