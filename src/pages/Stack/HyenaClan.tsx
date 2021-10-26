import React, { useContext } from "react";
import { StyleSheet, View, Image, Text, SafeAreaView } from "react-native";

import colors from "../../styles/colors";
import { TopBar } from "../../components/TopBar";
import StackContext from "../../contexts/Stack";
import { ScrollView } from "react-native-gesture-handler";
import { SafeZoneView } from "../../styles/Theme";
import { HCInfo } from "../../components/HCInfo";
import Aaaa from "../../";

export function HyenaClan() {
  // Theme
  const { isWhiteMode } = useContext(StackContext);

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <ScrollView>
          <TopBar name="CupForce" theme={isWhiteMode} />

          <View style={styles.HCInfoContainer}>
            <HCInfo
              theme={isWhiteMode}
              cover={require("../../assets/wpWallpaper.jpg")}
              hyenaShield={require("../../assets/wpIcon.png")}
              members={37}
              adms={8}
              memeRank={9}
            />
          </View>
        </ScrollView>
      }
    />
  );
}

const styles = StyleSheet.create({
  HCInfoContainer: {
    marginTop: 15,
  },
});
