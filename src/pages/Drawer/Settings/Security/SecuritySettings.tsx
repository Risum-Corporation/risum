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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StackContext from "../../../../contexts/Stack";
import { StatusBar } from "react-native";
import { SafeZoneView } from "../../../../styles/Theme";

export function SecuritySettings() {
  const navigation = useNavigation();

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  function handleChangePassword() {
    navigation.navigate("ChangePassword");
  }

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View>
          <GoBackButton
            theme={isWhiteMode}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.heading}>
            <Text
              style={[
                styles.title,
                isWhiteMode
                  ? { color: colors.greenLight }
                  : { color: colors.green },
              ]}
            >
              Segurança
            </Text>
            <View style={styles.options}>
              <TouchableOpacity onPress={handleChangePassword}>
                <View style={styles.item}>
                  <MaterialCommunityIcons
                    name="form-textbox-password"
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
                    Mudar Senha
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
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
