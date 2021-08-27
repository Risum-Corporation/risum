import React from "react";
import { SafeAreaView } from "react-native";
import Lottie from "lottie-react-native";

import loading from "../../loading.json";
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
      <Lottie source={loading} resizeMode="contain" autoPlay loop />
    </SafeAreaView>
  );
}
