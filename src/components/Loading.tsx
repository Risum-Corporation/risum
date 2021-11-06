import React from "react";
import { SafeAreaView } from "react-native";
import Lottie from "lottie-react-native";

import colors from "../styles/colors";

export function Loading() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      <Lottie
        source={require("../assets/lotties/loading.json")}
        resizeMode="contain"
        autoPlay
        autoSize
        loop
      />
    </SafeAreaView>
  );
}
