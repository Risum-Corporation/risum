import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import StackContext from "../contexts/Stack";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import Lottie from "lottie-react-native";
import searching from "../assets/lotties/searching.json";
import searchingLight from "../assets/lotties/searchingLight.json";

import { TwoButton } from "./TwoButton";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../contexts/Auth";

export function NotFollowingUsers() {
  // Theme
  const { isWhiteMode } = useContext(StackContext);

  const { signOut } = useContext(AuthContext);

  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{
        backgroundColor: isWhiteMode
          ? colors.backgroundLight
          : colors.background,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            { color: isWhiteMode ? colors.whiteLight : colors.white },
          ]}
        >
          Cadê todo mundo?
        </Text>
        <View style={styles.subtitleContainer}>
          <Text
            style={[
              styles.subtitle,
              { color: isWhiteMode ? colors.whiteLight : colors.white },
            ]}
          >
            Parece que você ainda
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isWhiteMode ? colors.pastelRedLight : colors.pastelRed },
            ]}
          >
            {" "}
            não
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isWhiteMode ? colors.whiteLight : colors.white },
            ]}
          >
            {" "}
            seguiu
          </Text>
        </View>
        <View style={styles.subtitleContainer2}>
          <Text
            style={[
              styles.subtitle,
              { color: isWhiteMode ? colors.whiteLight : colors.white },
            ]}
          >
            nenhum
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isWhiteMode ? colors.greenLight : colors.green },
            ]}
          >
            {" "}
            usuário
          </Text>
        </View>
        {isWhiteMode ? (
          <Lottie
            style={styles.astronaut}
            resizeMode="contain"
            autoSize
            source={searchingLight}
            autoPlay
            loop
          />
        ) : (
          <Lottie
            style={styles.astronaut}
            resizeMode="contain"
            autoSize
            source={searching}
            autoPlay
            loop
          />
        )}
        <Text
          style={[
            styles.subtitle,
            styles.subtitleContainer,
            { color: isWhiteMode ? colors.whiteLight : colors.white },
          ]}
        >
          Clique no botão verde para
        </Text>
        <Text
          style={[
            styles.subtitle,
            styles.subtitleContainer2,
            { color: isWhiteMode ? colors.whiteLight : colors.white },
          ]}
        >
          procurar por usuários do Risum
        </Text>

        <View style={styles.twoButtonContainer}>
          <TwoButton
            title={`Depois...`}
            then={() => {
              navigation.goBack();
            }}
            title1="Vamos!"
            then1={() => {
              navigation.navigate("Search");
            }}
            theme={isWhiteMode}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 27,
    fontWeight: "bold",
    fontFamily: fonts.heading,
  },
  subtitleContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  subtitleContainer2: {
    flexDirection: "row",
    marginTop: 8,
  },

  subtitle: {
    fontFamily: fonts.subtitle,
    fontWeight: "bold",
    fontSize: 17,
  },
  astronaut: {
    height: 250,
  },
  twoButtonContainer: {
    marginTop: 30,
  },
});
