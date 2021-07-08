import React from "react";
import Routes from "./src/routes";
import AppLoading from "expo-app-loading";
import {
  useFonts,
  Archivo_700Bold,
  Archivo_500Medium,
} from "@expo-google-fonts/archivo";

import { Poppins_400Regular } from "@expo-google-fonts/poppins";

import { Roboto_400Regular } from "@expo-google-fonts/roboto";

export default function App() {
  const [fontsLoaded] = useFonts({
    Archivo_700Bold,
    Archivo_500Medium,
    Poppins_400Regular,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return <Routes />;
}