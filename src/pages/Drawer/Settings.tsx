import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { GoBackButton } from "../../components/GoBackButton";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import AuthContext from "../../contexts/Auth";

export function Settings() {
  const navigation = useNavigation();
  const { signOut } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <GoBackButton onPress={() => navigation.goBack()} />
      <View style={styles.heading}>
        <Text style={styles.title}>Configurações</Text>
        <View style={styles.options}>
          <TouchableOpacity>
            <View style={styles.item}>
              <MaterialIcons name="person" size={33} color={colors.green} />
              <Text style={styles.subtitle}>Perfil</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.item}>
              <MaterialIcons name="security" size={33} color={colors.yellow} />
              <Text style={styles.subtitle}>Segurança</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.item}>
              <MaterialIcons name="badge" size={33} color={colors.pink} />
              <Text style={styles.subtitle}>Sobre nós</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.item}>
              <MaterialIcons name="policy" size={33} color={colors.cyan} />
              <Text style={styles.subtitle}>Politicas do Risum</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={signOut}>
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
  heading: {
    marginHorizontal: 50,
  },
  title: {
    color: colors.green,
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
