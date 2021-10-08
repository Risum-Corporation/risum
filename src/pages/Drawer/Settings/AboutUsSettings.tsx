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

export function AboutUsSettings() {
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
          Sobre nós
        </Text>
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
