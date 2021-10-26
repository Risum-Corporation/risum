import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextProps,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface TextComponentProps {
  title: string;
  theme: boolean;
  size?: number;
}

export function SimpleText({ title, theme, size }: TextComponentProps) {
  return (
    <Text
      style={[
        styles.simpleText,
        { color: theme ? colors.whiteLight : colors.white, fontSize: size },
      ]}
    >
      {title}
    </Text>
  );
}

interface SafeZoneViewProps {
  theme: boolean;
  lightBackground?: any;
  darkBackground?: any;
  content: any;
}
export function SafeZoneView({
  theme,
  lightBackground,
  darkBackground,
  content,
}: SafeZoneViewProps) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: theme
          ? lightBackground || colors.backgroundLight
          : darkBackground || colors.background,
        flex: 1,
      }}
    >
      <StatusBar
        barStyle={
          Platform.OS === "ios"
            ? theme
              ? "dark-content"
              : "light-content"
            : "default"
        }
      />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  simpleText: {
    fontSize: 16,
    fontFamily: fonts.text,
  },
});
