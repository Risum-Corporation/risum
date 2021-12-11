import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import { GoBackButton } from "../../../components/GoBackButton";
import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import StackContext from "../../../contexts/Stack";
import { StatusBar } from "react-native";
import { SafeZoneView, SimpleText } from "../../../styles/Theme";

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
          <View style={styles.photoContainer}>
            <Image
              style={styles.photo}
              source={require("../../../assets/aboutUS.png")}
            />
          </View>
          <View style={styles.text}>
            <Text
              style={{
                color: isWhiteMode ? colors.whiteLight : colors.white,
                textAlign: "center",
                fontFamily: fonts.subtitle,
                lineHeight: 20,
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
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
  photo: {
    width: 300,
    height: 190,
    borderRadius: 10,
  },
  photoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    marginHorizontal: 50,
    marginTop: 30,
  },
});
