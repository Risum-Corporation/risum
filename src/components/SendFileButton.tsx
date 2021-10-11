import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  Platform,
  Alert,
} from "react-native";

import { SimpleLineIcons } from "@expo/vector-icons";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import firebase from "../firebaseConnection";

import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

interface ButtonProps extends TouchableOpacityProps {
  theme: boolean;
}

export function SendFileButton({ theme, ...props }: ButtonProps) {
  const [image, setImage] = useState(null);
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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Gera um número aleatório, que será o nome da imagem
    const imageName = Math.floor(Math.random() * (1000000 - 100)) + 100;

    if (!result.cancelled) {
      uploadImage([result.uri, `${imageName}`])
        .then(() => {
          Alert.alert("Sucesso!");
        })
        .catch((error) => {
          Alert.alert(`Deu merda! ${error}`);
        });
    }
  }

  // Executada para salvar a imagem no Firebase
  async function uploadImage([uri, imageName]: string[]) {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("memes/" + imageName);

    return ref.put(blob);
  }

  return (
    <TouchableOpacity
      style={{ marginTop: 25 }}
      onPress={onChooseImagePress}
      {...props}
    >
      <View
        style={[
          styles.addMemeContainer,
          theme
            ? { borderColor: colors.greenLight }
            : { borderColor: colors.green },
        ]}
      >
        <SimpleLineIcons
          name="cloud-upload"
          size={120}
          color={theme ? colors.greenLight : colors.green}
        />
        <Text
          style={[
            styles.title,
            theme
              ? { color: colors.placeholderTextLight }
              : { color: colors.white },
            { marginTop: 20 },
          ]}
        >
          Clique aqui para{"\n"}postar um meme
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addMemeContainer: {
    alignItems: "center",
    borderWidth: 5,
    borderBottomEndRadius: 1,
    padding: 35,

    borderStyle: "dashed",
    borderRadius: 28,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 28,
    textAlign: "center",
  },
});
