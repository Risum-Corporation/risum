import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Platform, Alert, Image } from "react-native";
import colors from "../../styles/colors";
import { ConfirmButton } from "../../components/ConfirmButton";
import StackContext from "../../contexts/Stack";
import { TopBar } from "../../components/TopBar";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";

import firebase from "../../database/firebaseConnection";

import { SendFileButton } from "../../components/SendFileButton";

import fonts from "../../styles/fonts";
import { TextInput } from "react-native-paper";
import AuthContext from "../../contexts/Auth";
import { useNavigation } from "@react-navigation/native";
import { SafeZoneView } from "../../styles/Theme";

export function AddMeme() {
  const [memeTitle, setMemeTitle] = useState<string>();
  const [tags, setTags] = useState<string>();
  // Pode ser uma arquivo ou um vídeo
  const [meme, setMeme] = useState<string>();

  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  // Theme
  const { isWhiteMode } = useContext(StackContext);

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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    // Imagem salva no estado, será utilizada no uploadImage
    if (!result.cancelled) {
      setMeme(result.uri);
    }
  }

  // Executada para salvar a arquivo no Firebase (quando o botão Pronto! for clicado)
  async function uploadImage([uri, uid, fileName, fileTags]: string[]) {
    const response = await fetch(uri);
    const blob = await response.blob();

    // Salva a arquivo no caminho especificado no Storage do Firebase
    var ref = firebase
      .storage()
      .ref()
      .child(`media/memes/${uid}/${fileName.concat(` - ${fileTags}`)}`);

    await ref.put(blob);
    return await ref.getDownloadURL();
  }

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View>
          <TopBar name="Postar Meme" theme={isWhiteMode} />

          <View style={styles.container}>
            {meme ? (
              meme.toString().endsWith("mov" || "mp4" || "avi" || "wmv") ? (
                <Video
                  source={{ uri: meme }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="contain"
                  shouldPlay
                  isLooping
                  style={styles.submittedImage}
                />
              ) : (
                <Image source={{ uri: meme }} style={styles.submittedImage} />
              )
            ) : (
              <SendFileButton
                theme={isWhiteMode}
                title="postar um meme"
                onPress={onChooseImagePress}
              />
            )}

            <View style={[styles.form]}>
              <TextInput
                label="Título do Meme"
                mode={"flat"}
                value={memeTitle}
                clearTextOnFocus
                onChangeText={(memeTitle) => setMemeTitle(memeTitle)}
                placeholder="Telegram 2 - O Retorno?"
                placeholderTextColor={
                  isWhiteMode
                    ? colors.placeholderTextLight
                    : colors.placeholderText
                }
                underlineColor={"transparent"}
                style={
                  isWhiteMode
                    ? { backgroundColor: colors.lightBackgroundLight }
                    : {
                        backgroundColor: colors.lightBackground,
                        color: colors.white,
                        textDecorationColor: colors.white,
                      }
                }
                selectionColor={colors.divider}
                theme={{
                  colors: {
                    text: isWhiteMode ? colors.whiteLight : colors.white,
                    primary: isWhiteMode ? colors.greenLight : colors.green,
                    placeholder: isWhiteMode ? colors.whiteLight : colors.white,
                  },
                }}
              />

              <TextInput
                label="Tags"
                mode={"flat"}
                value={tags}
                clearTextOnFocus
                onChangeText={(tags) => setTags(tags)}
                placeholderTextColor={
                  isWhiteMode
                    ? colors.placeholderTextLight
                    : colors.placeholderText
                }
                underlineColor={"transparent"}
                style={
                  isWhiteMode
                    ? { backgroundColor: colors.lightBackgroundLight }
                    : {
                        backgroundColor: colors.lightBackground,
                        color: colors.white,
                        textDecorationColor: colors.white,
                      }
                }
                selectionColor={colors.divider}
                placeholder="Shitpost, Hiena, Zoio..."
                theme={{
                  colors: {
                    text: isWhiteMode ? colors.whiteLight : colors.white,
                    primary: isWhiteMode ? colors.greenLight : colors.green,
                    placeholder: isWhiteMode ? colors.whiteLight : colors.white,
                  },
                }}
              />

              <View style={styles.button}>
                <ConfirmButton
                  theme={isWhiteMode}
                  title="Pronto!"
                  onPress={() => {
                    // Se os campos estiverem preenchidos
                    if (memeTitle && tags) {
                      if (meme && user) {
                        uploadImage([meme, user?.uid, memeTitle, tags])
                          .then((url) => {
                            Alert.alert("Sucesso");
                            setMeme(undefined);
                            setMemeTitle(undefined);
                            setTags(undefined);

                            firebase
                              .firestore()
                              .collection("memes")
                              .doc(memeTitle)
                              .set({
                                // id do meme
                                memeUrl: url,
                                memeTitle: memeTitle,
                                tags: tags,
                                likes: 0,
                                comments: 0,
                                authorId: user.uid,
                                id: Math.floor(100000 + Math.random() * 900000),
                              });
                          })
                          .catch((error) => {
                            Alert.alert(`Algo deu errado: ${error}`);
                          });
                      } else {
                        Alert.alert("Insira um arquivo válido");
                      }
                    } else {
                      Alert.alert(
                        "Preencha todas as informações antes de postar seu meme"
                      );
                    }
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    marginHorizontal: 35,
  },
  subtitle: {
    fontFamily: fonts.heading,
    color: colors.white,
    fontSize: 20,
    lineHeight: 50,
  },
  form: {
    width: "100%",
    marginTop: 40,
  },
  input: {
    height: 64,
    padding: 20,
    borderBottomWidth: 1,
  },
  button: {
    marginTop: 40,
    paddingHorizontal: 100,
  },
  submittedImage: {
    width: 350,
    height: 300,
    resizeMode: "cover",
    borderRadius: 20,
  },
});
