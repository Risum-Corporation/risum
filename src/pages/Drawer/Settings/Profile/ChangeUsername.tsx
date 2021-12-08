import React, { useContext } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { ConfirmButton } from "../../../../components/ConfirmButton";
import colors from "../..//../../styles/colors";
import fonts from "../..//../../styles/fonts";

import firebase from "../..//../../database/firebaseConnection";

import { useState } from "react";

import StackContext from "../..//../../contexts/Stack";
import { useNavigation } from "@react-navigation/native";
import { SafeZoneView } from "../../../../styles/Theme";
import AuthContext from "../../../../contexts/Auth";
import { TextInput } from "react-native-paper";

export function ChangeUsername() {
  const [userName, setUserName] = useState<string>();
  const { isWhiteMode } = useContext(StackContext);
  const { user, updateUser } = useContext(AuthContext);
  const navigation = useNavigation();

  async function handleSubmit() {
    const auth = firebase.auth().currentUser;
    if (auth && userName && userName.replace(/\s/g, "").length) {
      await firebase
        .firestore()
        .collection("users")
        .doc(auth.uid)
        .update({
          userName: userName,
        })
        .then(() => {
          //Navega para a StackRoutes
          Alert.alert("Seu nome de usuário foi atualizado com sucesso 😄");

          updateUser({ ...user!, userName: userName });

          navigation.navigate("Feed");
        });
    } else {
      Alert.alert("Não foi possivel alterar seu nome de usuário 😕");
    }
  }

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View style={styles.container}>
          <View
            style={
              isWhiteMode
                ? [styles.wrapper, { backgroundColor: colors.backgroundLight }]
                : [styles.wrapper, { backgroundColor: colors.background }]
            }
          >
            <View style={styles.form}>
              <TextInput
                mode="flat"
                value={userName}
                underlineColor="transparent"
                placeholder="Novo nome de usuário"
                placeholderTextColor={
                  isWhiteMode
                    ? colors.placeholderTextLight
                    : colors.placeholderText
                }
                style={[
                  isWhiteMode
                    ? { backgroundColor: colors.lightBackgroundLight }
                    : {
                        backgroundColor: colors.lightBackground,
                        color: colors.white,
                        textDecorationColor: colors.white,
                      },
                  styles.input,
                ]}
                selectionColor={colors.divider}
                theme={{
                  colors: {
                    text: isWhiteMode ? colors.whiteLight : colors.white,
                    primary: isWhiteMode ? colors.greenLight : colors.green,
                    placeholder: isWhiteMode ? colors.whiteLight : colors.white,
                  },
                }}
                maxLength={10}
                onChangeText={(userName) => {
                  setUserName(userName);
                }}
              />
            </View>
            <View style={styles.buttonBox}>
              <ConfirmButton
                theme={isWhiteMode}
                title="Aplicar"
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  heading: {
    textAlign: "left",
    width: "100%",
  },
  title: {
    fontFamily: fonts.heading,
    color: colors.white,
    fontSize: 27,
    lineHeight: 50,
    justifyContent: "center",
    textAlign: "center",
  },
  form: {
    width: "100%",
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
  },
  buttonBox: {
    width: "100%",
    marginTop: 50,

    bottom: 1,
  },
  userImg: {
    width: "100%",
    height: 270,
    resizeMode: "contain",
    borderRadius: 28,
  },
});
