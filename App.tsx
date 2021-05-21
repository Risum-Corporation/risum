import React from "react";
import Routes from "./src/routes";
import AppLoading from "expo-app-loading";
import {
  useFonts,

  //the fonts have already been imported, archivo, poppins and roboto. We just need to put them here
} from "@expo-google-fonts/jost";

export default function App() {
  const [fontsLoaded] = useFonts({
    //Fonts here
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return <Routes />;
}
