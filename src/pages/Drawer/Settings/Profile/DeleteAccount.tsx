import React, { useContext } from "react";
import { SafeAreaView, Text, Image, StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";

import Lottie from "lottie-react-native";
import colors from "../../../../styles/colors";
import StackContext from "../../../../contexts/Stack";
import AuthContext from "../../../../contexts/Auth";
import { TwoButton } from "../../../../components/TwoButton";
import fonts from "../../../../styles/fonts";

import crying from "../../../../assets/lotties/crying.json";

export function DeleteAccount() {
  const navigation = useNavigation();

  const { deleteAccount } = useContext(AuthContext);

  // Theme
  const { isWhiteMode } = useContext(StackContext);

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
          Você está prestes a{"\n"}excluir sua conta!
        </Text>
        <View style={styles.subtitleContainer}>
          <Text
            style={[
              styles.subtitle,
              { color: isWhiteMode ? colors.whiteLight : colors.white },
            ]}
          >
            Tem certeza que deseja
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isWhiteMode ? colors.pastelRedLight : colors.pastelRed },
            ]}
          >
            {" "}
            continuar?
          </Text>
        </View>

        <Lottie
          style={styles.crying}
          resizeMode="contain"
          autoSize
          source={crying}
          autoPlay
          loop
        />

        <View style={styles.subtitleContainer2}>
          <Text
            style={[
              styles.subtitle,
              { color: isWhiteMode ? colors.whiteLight : colors.white },
            ]}
          >
            Sua
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isWhiteMode ? colors.greenLight : colors.green },
            ]}
          >
            {" "}
            Conta Risum
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isWhiteMode ? colors.whiteLight : colors.white },
            ]}
          >
            {" "}
            e todas as suas
          </Text>
        </View>

        <View>
          <Text
            style={[
              styles.subtitle,
              { color: isWhiteMode ? colors.whiteLight : colors.white },
            ]}
          >
            informações no aplicativo serão
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: isWhiteMode ? colors.pastelRedLight : colors.pastelRed },
            ]}
          >
            irreversivelmente apagadas!
          </Text>
        </View>

        <View style={styles.twoButtonContainer}>
          <TwoButton
            title={`Sim, apagar`}
            then={() => {
              navigation.navigate("ConfirmPassword");
            }}
            title1="Não, leve-me de volta ao Risum"
            then1={() => {
              navigation.navigate("HypeTrain");
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
    textAlign: "center",
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
  crying: {
    height: 250,
  },
  twoButtonContainer: {
    marginTop: 30,
  },
});
