import React, { useContext } from "react";
import { SafeAreaView, Text, Image, StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import AuthContext from "../contexts/Auth";
import StackContext from "../contexts/Stack";
import { TwoButton } from "../components/TwoButton";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import astronaut from "../assets/lotties/astronaut.json";
import astronautLight from "../assets/lotties/astronautLight.json";

import Lottie from "lottie-react-native";
export function NoAccount() {
  const navigation = useNavigation();

  const { signOut } = useContext(AuthContext);

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  return (
    <SafeAreaView
      style={{
        backgroundColor: isWhiteMode
          ? colors.backgroundLight
          : colors.background,
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            { color: isWhiteMode ? colors.whiteLight : colors.white },
          ]}
        >
          Ops!
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
            está
          </Text>
        </View>
        <View style={styles.subtitleContainer2}>
          <Text
            style={[
              styles.subtitle,
              { color: isWhiteMode ? colors.whiteLight : colors.white },
            ]}
          >
            {" "}
            em uma Conta
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isWhiteMode ? colors.greenLight : colors.green },
            ]}
          >
            {" "}
            Risum
          </Text>
        </View>
        {isWhiteMode ? (
          <Lottie
            style={styles.astronaut}
            resizeMode="contain"
            autoSize
            source={astronautLight}
            autoPlay
            loop
          />
        ) : (
          <Lottie
            style={styles.astronaut}
            resizeMode="contain"
            autoSize
            source={astronaut}
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
          Entre pro time para acessar essa
        </Text>
        <Text
          style={[
            styles.subtitle,
            styles.subtitleContainer2,
            { color: isWhiteMode ? colors.whiteLight : colors.white },
          ]}
        >
          e muitas outras funções!
        </Text>

        <View style={styles.twoButtonContainer}>
          <TwoButton
            title={`Depois...`}
            then={() => {
              navigation.navigate("Feed");
            }}
            title1="Vamos!"
            then1={() => {
              signOut();
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
    marginTop: 70,
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
