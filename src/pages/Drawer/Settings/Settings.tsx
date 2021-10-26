import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import { GoBackButton } from "../../../components/GoBackButton";
import colors from "../../../styles/colors";
import fonts from "../../../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import AuthContext from "../../../contexts/Auth";
import StackContext from "../../../contexts/Stack";
import { StatusBar } from "react-native";
import { SettingsButton } from "../../../components/SettingsButton";

export function Settings() {
  const navigation = useNavigation();
  const { signOut } = useContext(AuthContext);

  // Theme
  const { isWhiteMode, toggleWhiteMode } = useContext(StackContext);

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
          Configurações
        </Text>
        <View style={styles.options}>
          <TouchableOpacity
            onPress={() => {
              toggleWhiteMode();
            }}
          >
            <View style={styles.item}>
              <Ionicons
                name={isWhiteMode ? "moon" : "ios-sunny"}
                size={33}
                color={isWhiteMode ? colors.whiteLight : colors.white}
              />

              <Text
                style={[
                  styles.subtitle,
                  isWhiteMode
                    ? { color: colors.whiteLight }
                    : { color: colors.white },
                ]}
              >
                {isWhiteMode ? "Modo Escuro" : "Modo Claro"}
              </Text>
            </View>
          </TouchableOpacity>

          <SettingsButton
            theme={isWhiteMode}
            icon="person"
            title="Perfil"
            light={colors.greenLight}
            dark={colors.green}
            goTo="ProfileSettings"
          />
          <SettingsButton
            theme={isWhiteMode}
            icon="security"
            title="Segurança"
            light={colors.yellowLight}
            dark={colors.yellow}
            goTo="SecuritySettings"
          />
          <SettingsButton
            theme={isWhiteMode}
            icon="badge"
            title="Sobre nós"
            light={colors.pinkLight}
            dark={colors.pink}
            goTo="AboutUsSettings"
          />
          <SettingsButton
            theme={isWhiteMode}
            icon="policy"
            title="Politicas do Risum"
            light={colors.cyanLight}
            dark={colors.cyan}
            goTo="RisumPoliciesSettings"
          />

          <TouchableOpacity
            onPress={() => {
              signOut();
            }}
          >
            <View style={[styles.item, { marginLeft: 3 }]}>
              <MaterialIcons name="logout" size={33} color={colors.pastelRed} />
              <Text style={[styles.subtitle, { color: colors.pastelRed }]}>
                Sair
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
    justifyContent: "center",
  },

  containerLight: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
    justifyContent: "center",

  },
  heading: {
    marginHorizontal: 50,
  },
  title: {
    fontFamily: fonts.heading,
    fontWeight: "bold",
    fontSize: 25,
  },
  options: {
    marginTop: 50,
  },
  subtitle: {
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
