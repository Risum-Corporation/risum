import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform } from "react-native";
import { GoBackButton } from "../../../components/GoBackButton";
import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import StackContext from "../../../contexts/Stack";
import { StatusBar } from "react-native";
import { SafeZoneView } from "../../../styles/Theme";

export function AboutUsSettings() {
  const navigation = useNavigation();

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View>
          <GoBackButton
            theme={isWhiteMode}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.heading}>
            <Text
              style={[
                styles.title,
                isWhiteMode
                  ? { color: colors.greenLight }
                  : { color: colors.green },
              ]}
            >
              Sobre nós
            </Text>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  heading: {
    marginHorizontal: 50,
  },
  title: {
    fontFamily: fonts.heading,
    fontWeight: "bold",
    fontSize: 25,
    marginTop: "30%",
  },
  options: {
    marginTop: 50,
  },
  subtitle: {
    color: colors.white,
    fontFamily: fonts.subtitle,
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },
});
