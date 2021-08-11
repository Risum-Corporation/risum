import React, { useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

import { Modalize } from "react-native-modalize";

import { AntDesign } from "@expo/vector-icons";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function TopBar({ name }: string) {
  const modalizeRef = useRef(null);

  function handleClickProfile() {
    modalizeRef.current?.open();
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={handleClickProfile}>
          <Image
            source={require("../assets/profilePicture.png")}
            style={styles.profileImg}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{name}</Text>
        <TouchableOpacity>
          <AntDesign name={"search1"} size={30} color={colors.white} />
        </TouchableOpacity>
        <Modalize ref={modalizeRef} snapPoint={180}>
          <View style={styles.modal}>
            <TouchableOpacity>
              <AntDesign name={"user"} size={30} color={colors.white} />
              <Text style={styles.title}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name={"setting"} size={30} color={colors.white} />
              <Text style={styles.title}>Configurações</Text>
            </TouchableOpacity>
          </View>
        </Modalize>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 25,
    position: "absolute",
    top: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    marginHorizontal: 25,
    justifyContent: "space-between",
    alignItems: "center",
    height: 5,
    marginVertical: 10,
    flexDirection: "row",
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.green,
  },
  img: {
    width: 36,
    height: 36,
    borderRadius: 5,
  },
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 7.5,
  },
  modal: {
    flex: 1,
    height: 180,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.lightBackground,
  },
});
