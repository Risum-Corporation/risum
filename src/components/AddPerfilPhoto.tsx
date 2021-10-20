import React, { useState } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";
import colors from "../styles/colors";

import fonts from "../styles/fonts";

interface AddPerfilPhotoProps  {
  theme: boolean;
}

export function AddPerfilPhoto({ theme, ...rest }: AddPerfilPhotoProps) {
  return (
   <></>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    width: "100%",
    height: 60,

    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.heading,
  },
});
