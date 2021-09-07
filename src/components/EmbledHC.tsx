import React from "react";

import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

import colors from "../styles/colors";
import { Image } from "react-native";
import SwitchMode from "../styles/SwitchMode";

export function EmbledWP() {
  // Theme
  let isSwitchOn = SwitchMode.isSwitchOn;

  return (
    <View
      style={
        isSwitchOn
          ? { backgroundColor: colors.backgroundLight }
          : { backgroundColor: colors.background }
      }
    >
      <View style={styles.wpWallpaperContainer}>
        <Image
          source={require("../assets/wpWallpaper.jpg")}
          style={styles.wpWallpaper}
        />
      </View>

      <View style={styles.container}>
        <Image source={require("../assets/wpIcon.png")} style={styles.wpIcon} />
        <View style={styles.wpInfo}>
          <View>
            <View style={styles.lineText}>
              <Text
                style={[
                  styles.greenText,
                  isSwitchOn
                    ? { color: colors.greenLight }
                    : { color: colors.green },
                ]}
              >
                1535
              </Text>
              <Text
                style={[
                  isSwitchOn
                    ? { color: colors.whiteLight }
                    : { color: colors.white },
                  styles.text,
                ]}
              >
                Membros
              </Text>
            </View>

            <View style={styles.lineText}>
              <Text
                style={[
                  styles.greenText,
                  isSwitchOn
                    ? { color: colors.greenLight }
                    : { color: colors.green },
                ]}
              >
                37
              </Text>
              <Text
                style={[
                  isSwitchOn
                    ? { color: colors.whiteLight }
                    : { color: colors.white },
                  styles.text,
                ]}
              >
                Adms
              </Text>
            </View>
          </View>
          <View style={styles.lineText}>
            <Text
              style={[
                styles.greenText,
                isSwitchOn
                  ? { color: colors.greenLight }
                  : { color: colors.green },
              ]}
            >
              3º
            </Text>
            <Text
              style={[
                isSwitchOn
                  ? { color: colors.outlineGrayLight }
                  : { color: colors.inputText },
                { fontWeight: "bold", marginHorizontal: 5 },
              ]}
            >
              no MemeRank
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  container: {
    alignItems: "center",
    marginHorizontal: 35,
  },
  wpWallpaper: {
    resizeMode: "cover", // IMPORTANTE! NÃO REMOVER
    height: 160,
    width: "100%",
    borderRadius: 10,
  },
  wpWallpaperContainer: {
    marginHorizontal: 10,
  },
  wpInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "115%",
    marginBottom: 40,
    marginTop: 10,
  },
  wpIcon: {
    width: 100,
    height: 100,
    marginTop: -35,
    borderColor: colors.background,
    alignItems: "center",
    position: "absolute",
  },
  text: {
    marginHorizontal: 5,
    fontWeight: "bold",
  },
  greenText: {
    fontWeight: "bold",
  },
  lineText: {
    marginHorizontal: 5,
    flexDirection: "row",
  },
});
