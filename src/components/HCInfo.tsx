import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import colors from "../styles/colors";

import fonts from "../styles/fonts";

interface HCProps {
  theme: boolean;
  cover: any;
  hyenaShield: any;
  members: number;
  adms: number;
  memeRank?: number;
}

export function HCInfo({
  theme,
  cover,
  hyenaShield,
  members,
  adms,
  memeRank,
}: HCProps) {
  return (
    <>
      <View style={styles.wallpaperContainer}>
        <Image
          source={cover ? { uri: cover } : require("../assets/wpWallpaper.jpg")}
          style={styles.wallpaper}
        />
      </View>
      <View style={styles.headerContainer}>
        <Image
          source={
            hyenaShield
              ? { uri: hyenaShield }
              : require("../assets/risumDefault.png")
          }
          style={styles.wpIcon}
        />
        <View style={styles.info}>
          <View>
            <View style={styles.lineText}>
              <Text
                style={
                  theme
                    ? [styles.text, { color: colors.greenLight }]
                    : [styles.text, { color: colors.green }]
                }
              >
                {members}
              </Text>
              <Text
                style={
                  theme
                    ? [styles.text, { color: colors.whiteLight }]
                    : [styles.text, { color: colors.white }]
                }
              >
                Membros
              </Text>
            </View>

            <View style={styles.lineText}>
              <Text
                style={
                  theme
                    ? [styles.text, { color: colors.greenLight }]
                    : [styles.text, { color: colors.green }]
                }
              >
                {adms}
              </Text>
              <Text
                style={
                  theme
                    ? [styles.text, { color: colors.whiteLight }]
                    : [styles.text, { color: colors.white }]
                }
              >
                Adms
              </Text>
            </View>
          </View>
          <View style={styles.lineText}>
            <Text
              style={
                theme
                  ? [styles.text, { color: colors.greenLight }]
                  : [styles.text, { color: colors.green }]
              }
            >
              {memeRank}º
            </Text>
            <Text
              style={
                theme
                  ? [styles.text, { color: colors.whiteLight }]
                  : [styles.text, { color: colors.white }]
              }
            >
              no MemeRank
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    marginHorizontal: 35,
  },
  wallpaper: {
    resizeMode: "cover", // IMPORTANTE! NÃO REMOVER
    height: 160,
    width: "100%",
    borderRadius: 10,
  },
  wallpaperContainer: {
    marginHorizontal: 10,
  },
  info: {
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
    borderRadius: 20,
    borderColor: colors.background,
    alignItems: "center",
    position: "absolute",
  },
  text: {
    marginHorizontal: 2.5,
    fontWeight: "bold",
  },
  lineText: {
    marginHorizontal: 5,
    flexDirection: "row",
  },
});
