import React, { useContext, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Alert,
  Image,
  Platform,
} from "react-native";
import { ConfirmButton } from "../../../../components/ConfirmButton";
import colors from "../..//../../styles/colors";
import fonts from "../..//../../styles/fonts";

import { TextInput } from "react-native-paper";

import firebase from "../..//../../database/firebaseConnection";
import { AddAvatar } from "../..//../../components/AddAvatar";
import * as ImagePicker from "expo-image-picker";

import { RegisterProgressBar } from "../..//../../components/RegisterProgressBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

import StackContext from "../..//../../contexts/Stack";
import { useNavigation } from "@react-navigation/native";

export function ChangeAvatar() {
  const [userName, setUserName] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("");
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
      setUserImage(result.uri);
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

  async function handleSubmit() {
    await AsyncStorage.setItem("@risum:user", userName);

    // Tag única do usuário
    const tag = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);

    const auth = firebase.auth().currentUser;
    if (auth && !userImage) {
      await firebase
        .firestore()
        .collection("users")
        .doc(auth.uid)
        .set({
          userName: userName,
          tag: tag,
          userId: auth.uid,
        })
        .then(() => {
          //Navega para a StackRoutes
          return navigation.navigate('Feed')
        });
    }
    else if (auth && userImage) {
      // Upload da imagem de perfil
      const userPicture = await uploadImage([
        userImage,
        auth.uid,
        `${userName}-avatar`,
      ]);

      await firebase
        .firestore()
        .collection("users")
        .doc(auth.uid)
        .set({
          userName: userName,
          userImage: userPicture,
          tag: tag,
          userId: auth.uid,
        })
        .then(() => {
          //Navega para a StackRoutes
          Alert.alert("Sua foto foi alterada com sucesso 😄");
        });
    } else {
        Alert.alert("Não foi possivel alterar sua foto 😕");
    }
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isWhiteMode
            ? colors.backgroundLight
            : colors.background,
        },
      ]}
    >
      <View
        style={
          isWhiteMode
            ? [styles.wrapper, { backgroundColor: colors.backgroundLight }]
            : [styles.wrapper, { backgroundColor: colors.background }]
        }
      >


        <View style={styles.form}>
          {userImage ? (
            <Image source={{ uri: userImage }} style={styles.userImg} />
          ) : (
            <AddAvatar
              theme={isWhiteMode}
              title="adicionar um avatar"
              onPress={onChooseImagePress}
            />
          )}
        </View>
        <View style={styles.buttonBox}>
          <ConfirmButton
            theme={isWhiteMode}
            title="Aplicar"
            onPress={handleSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
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
    justifyContent: 'center',
    textAlign: 'center'
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
    borderRadius: 28
  },
});