import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform
} from "react-native";
import { GoBackButton } from "../../components/GoBackButton";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import AuthContext from "../../contexts/Auth";
import StackContext from "../../contexts/Stack";
import { StatusBar } from "react-native";

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
          <TouchableOpacity>
            <View style={styles.item}>
              <MaterialIcons
                name="person"
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
                Perfil
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.item}>
              <MaterialIcons
                name="security"
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
                Segurança
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.item}>
              <MaterialIcons
                name="badge"
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
                Sobre nós
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.item}>
              <MaterialIcons
                name="policy"
                size={33}
                color={isWhiteMode ? colors.cyanLight : colors.cyan}
              />
              <Text
                style={[
                  styles.subtitle,
                  isWhiteMode
                    ? { color: colors.whiteLight }
                    : { color: colors.white },
                ]}
              >
                Politicas do Risum
              </Text>
            </View>
          </TouchableOpacity>

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
