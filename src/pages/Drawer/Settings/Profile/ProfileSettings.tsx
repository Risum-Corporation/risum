import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { GoBackButton } from "../../../../components/GoBackButton";
import colors from "../../../../styles/colors";
import fonts from "../../../../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import AuthContext from "../../../../contexts/Auth";
import StackContext from "../../../../contexts/Stack";
import { StatusBar } from "react-native";

export function ProfileSettings() {
  const navigation = useNavigation();

  // Theme
  const { isWhiteMode, toggleWhiteMode } = useContext(StackContext);

  function handleChangeAvatar() {
    navigation.navigate("ChangeAvatar");
  }

  function handleNoAccount() {
    navigation.navigate("NoAccount");
  }

  const { isAnonymous } = useContext(AuthContext);

  return (
    <SafeAreaView
      style={isWhiteMode ? styles.containerLight : styles.container}
    >
      <StatusBar
        barStyle={
          Platform.OS === "ios"
            ? isWhiteMode
              ? "dark-content"
              : "light-content"
            : "default"
        }
      />
      <GoBackButton theme={isWhiteMode} onPress={() => navigation.goBack()} />
      <View style={styles.heading}>
        <Text
          style={[
            styles.title,
            isWhiteMode
              ? { color: colors.greenLight }
              : { color: colors.green },
          ]}
        >
          Perfil
        </Text>
        <View style={styles.options}>
          <TouchableOpacity
            onPress={() => {
              toggleWhiteMode();
            }}
          ></TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.item}>
              <MaterialIcons
                name="input"
                size={33}
                color={isWhiteMode ? colors.greenLight : colors.green}
              />
              <Text
                style={[
                  styles.subtitle,
                  isWhiteMode
                    ? { color: colors.whiteLight }
                    : { color: colors.white },
                ]}
              >
                Trocar nome
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={isAnonymous ? handleNoAccount : handleChangeAvatar}
          >
            <MaterialIcons
              name="add-a-photo"
              size={33}
              color={isWhiteMode ? colors.yellowLight : colors.yellow}
            />
            <Text
              style={[
                styles.subtitle,
                isWhiteMode
                  ? { color: colors.whiteLight }
                  : { color: colors.white },
              ]}
            >
              Mudar foto
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.item}>
              <MaterialIcons
                name="photo-size-select-actual"
                size={33}
                color={isWhiteMode ? colors.pinkLight : colors.pink}
              />
              <Text
                style={[
                  styles.subtitle,
                  isWhiteMode
                    ? { color: colors.whiteLight }
                    : { color: colors.white },
                ]}
              >
                Alterar capa
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  containerLight: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },

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
});
