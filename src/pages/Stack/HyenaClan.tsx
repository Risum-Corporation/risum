import React, { useContext } from "react";
import { StyleSheet, View, Image, Text, SafeAreaView } from "react-native";

import colors from "../../styles/colors";
import { TopBar } from "../../components/TopBar";
import StackContext from "../../contexts/Stack";
import { ScrollView } from "react-native-gesture-handler";
import { SafeZoneView } from "../../styles/Theme";

export function HyenaClan() {
  // Theme
  const { isWhiteMode } = useContext(StackContext);

  return (
    <SafeZoneView theme={isWhiteMode} content={
    <ScrollView>
      <TopBar name="CupForce" theme={isWhiteMode} />
      <View style={styles.wallpaperContainer}>
        <Image
          source={require("../../assets/wpWallpaper.jpg")}
          style={styles.wallpaper}
        />
      </View>

      <View style={styles.headerContainer}>
        <Image source={require("../../assets/wpIcon.png")} style={styles.wpIcon} />
        <View style={styles.info}>
          <View>
            <View style={styles.lineText}>
              <Text
                style={
                  isWhiteMode
                    ? [styles.text, { color: colors.greenLight }]
                    : [styles.text, { color: colors.green }]
                }
              >
                1535
              </Text>
              <Text
                style={
                  isWhiteMode
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
                  isWhiteMode
                    ? [styles.text, { color: colors.greenLight }]
                    : [styles.text, { color: colors.green }]
                }
              >
                37
              </Text>
              <Text
                style={
                  isWhiteMode
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
                isWhiteMode
                  ? [styles.text, { color: colors.greenLight }]
                  : [styles.text, { color: colors.green }]
              }
            >
              3º
            </Text>
            <Text
              style={
                isWhiteMode
                  ? [styles.text, { color: colors.whiteLight }]
                  : [styles.text, { color: colors.white }]
              }
            >
              no MemeRank
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>}/>
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
