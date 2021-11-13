import React, { useContext, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

import { TextInput } from "react-native-paper";

import firebase from "../../database/firebaseConnection";
import { AddAvatar } from "../../components/AddAvatar";
import * as ImagePicker from "expo-image-picker";

import { RegisterProgressBar } from "../../components/RegisterProgressBar";
import { useState } from "react";

import AuthContext from "../../contexts/Auth";
import StackContext from "../../contexts/Stack";
import { useNavigation } from "@react-navigation/native";
import { SafeZoneView } from "../../styles/Theme";

export function RegisterStg2() {
  const { login, signOut } = useContext(AuthContext);
  const [userName, setUserName] = useState<string>();
  const [avatar, setAvatar] = useState<string>();
  const { isWhiteMode } = useContext(StackContext);
  const navigation = useNavigation();

  useEffect(() => {
    // Pede permissão para acessar a galeria do usuário
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("É necessária permissão para acessar sua galeria");
          navigation.navigate("Feed");
        }
      }
    })();
  }, []);

  function handleUserNameInput(value: string) {
    setUserName(String(value));
  }

  // Executada quando o usuário clicar para inserir uma foto
  async function onChooseImagePress() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      aspect: [4, 3],
    });

    // Imagem salva no estado, será utilizada no uploadImage
    if (!result.cancelled) {
      setAvatar(result.uri);
    }
  }

  // Executada para salvar a arquivo no Firebase (quando o botão Pronto! for clicado)
  async function uploadImage([uri, uid, fileName]: string[]) {
    // Verifica se a imagem é válida
    if (uri === "" || !uri) {
      return console.log("Imagem inválida");
    }
    const response = await fetch(uri);
    const blob = await response.blob();

    // Salva a arquivo no caminho especificado no Storage do Firebase
    var ref = firebase.storage().ref().child(`users/${uid}/${fileName}`);

    await ref.put(blob);
    return await ref.getDownloadURL();
  }

  // Quando o botão Pronto! for clicado
  async function handleSubmit() {
    // Tag única do usuário
    const tag = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);

    const auth = firebase.auth().currentUser;
    // Usuário sem foto de perfil
    if (auth && !avatar) {
      await firebase
        .firestore()
        .collection("users")
        .doc(auth.uid)
        .set({
          userName: userName,
          avatar: null,
          tag: tag,
          cover: null,
          uid: auth.uid,
          following: [],
          likedMemes: [],
          savedMemes: [],
          wolfPackId: null,
        })
        .then(() => {
          // Inicia a persistência do usuário
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

          //Navega para a StackRoutes
          return login(auth);
        });
    }
    // Usuário com foto de perfil
    else if (auth && avatar) {
      // Upload da imagem de perfil
      const userPicture = await uploadImage([
        avatar,
        auth.uid,
        `${userName}-avatar`,
      ]);

      await firebase
        .firestore()
        .collection("users")
        .doc(auth.uid)
        .set({
          userName: userName,
          avatar: userPicture,
          tag: tag,
          cover: null,
          uid: auth.uid,
          following: [],
          likedMemes: [],
          savedMemes: [],
          wolfPackId: null,
        })
        .then(() => {
          //Navega para a StackRoutes
          return login(auth);
        });
    } else {
      signOut();
      navigation.navigate("Welcome");
    }
  }

  // Executada caso o usuário queira trocar de imagem de perfil antes de se cadastrar
  async function removeImageOnPress() {
    setAvatar(undefined);
    await onChooseImagePress();
  }

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <RegisterProgressBar position={90} theme={isWhiteMode} />
            <View style={styles.heading}>
              <Text
                style={
                  isWhiteMode
                    ? [styles.title, { color: colors.whiteLight }]
                    : [styles.title, { color: colors.white }]
                }
              >
                Insira suas{"\n"}informações de perfil
              </Text>
            </View>

            <View style={styles.form}>
              {avatar ? (
                <TouchableOpacity
                  onPress={() => {
                    removeImageOnPress();
                  }}
                >
                  <Image source={{ uri: avatar }} style={styles.userImg} />
                </TouchableOpacity>
              ) : (
                <AddAvatar
                  theme={isWhiteMode}
                  title="adicionar um avatar"
                  onPress={onChooseImagePress}
                />
              )}
              <View style={styles.userName}>
                <TextInput
                  mode="flat"
                  underlineColor="transparent"
                  placeholder="Nome de usuário"
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
                      placeholder: isWhiteMode
                        ? colors.whiteLight
                        : colors.white,
                    },
                  }}
                  maxLength={10}
                  onChangeText={handleUserNameInput}
                />
              </View>
            </View>
            <View style={styles.buttonBox}>
              <ConfirmButton
                theme={isWhiteMode}
                title="Confirmar"
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
  },
  wrapper: {
    alignItems: "center",
    justifyContent: "space-around",
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
    marginTop: 75,
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
  userName: {
    marginTop: 30,
  },
});
