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
import { SettingsButton } from "../../../../components/SettingsButton";

export function ProfileSettings() {
  const navigation = useNavigation();

  // Theme
  const { isWhiteMode, toggleWhiteMode } = useContext(StackContext);

  function handleChangeAvatar() {
    navigation.navigate("ChangeAvatar");
  }

  function handleChangeCover() {
    navigation.navigate("ChangeCover");
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
          <SettingsButton
            theme={isWhiteMode}
            icon="input"
            title="Trocar nome"
            light={colors.greenLight}
            dark={colors.green}
            goTo=""
          />
          <SettingsButton
            theme={isWhiteMode}
            icon="add-a-photo"
            title="Mudar foto"
            light={colors.yellowLight}
            dark={colors.yellow}
            goTo={ !isAnonymous ? "ChangeAvatar" : "NoAccount"}
          />
          <SettingsButton
            theme={isWhiteMode}
            icon="photo-size-select-actual"
            title="Alterar Capa"
            light={colors.pinkLight}
            dark={colors.pink}
            goTo={ !isAnonymous ? "ChangeCover" : "NoAccount"}
          />
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
