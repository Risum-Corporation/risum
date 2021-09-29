import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  Platform,
} from "react-native";

import { SimpleLineIcons } from "@expo/vector-icons";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

interface ButtonProps extends TouchableOpacityProps {
  theme: boolean;
}

export function SendFileButton({ theme, ...props }: ButtonProps) {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "É necessária permissão para acessar suas fotos para postar um meme"
          );
          navigation.navigate("Feed");
        }
      }
    })();
  }, []);

  return (
    <TouchableOpacity
      style={{ marginTop: 25 }}
      onPress={async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        setImage(result.uri);
      }}
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
