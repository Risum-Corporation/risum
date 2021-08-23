import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  View
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar, Button, Menu, Divider, Provider } from "react-native-paper";
import fonts from "../styles/fonts";
import colors from "../styles/colors";
import { useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";



interface TopBarProps {
  name: string;
}

export function TopBar(props: TopBarProps) {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [isSearchPressed, setIsSearchPressed] = useState<boolean>();

  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

  function handleSearchClick() {
    setIsSearchPressed(!isSearchPressed);
  }

  // For the menu, when pressing the profile picture

  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  

  // For menu navigation
  
  const navigation = useNavigation();

  function handleProfile() {
    return navigation.navigate("Profile");
  }

  function handleConfig() {
    return navigation.navigate("Settings");
  }

  function handleSavedMemes() {
    return navigation.navigate("SavedMemes");
  }

  return (
    <SafeAreaView style={styles.container}>
      <Provider>
        <View>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            style={{
              width: 210,
              marginTop: Platform.OS === "ios" ? 40 : 11,
              position: 'absolute'
 
            }}
            anchor={
              <TouchableOpacity onLongPress={openMenu} onPress={handleProfile}>
                <Image
                  source={require("../assets/profilePicture.png")}
                  style={styles.avatar}
                />
              </TouchableOpacity>}>

            {/*https://materialdesignicons.com/*/}
            <Menu.Item icon="account-circle" onPress={handleProfile}  title=" Perfil" />
            <Divider />
            <Menu.Item icon="cog" onPress={handleConfig} title="Configurações" />

            <Menu.Item icon="star" onPress={handleSavedMemes} title="Memes Salvos" />
          </Menu>
        </View>
      </Provider>

      {!isSearchPressed && <Text style={styles.title}>{props.name}</Text>}

      <TouchableOpacity onPress={handleSearchClick}>
        <AntDesign
          name={isSearchPressed ? "close" : "search1"}
          size={30}
          color={colors.white}
        />
      </TouchableOpacity>

      {isSearchPressed && (
        <Searchbar
          placeholder="Pesquise por: Alcateias, perfis, memes..."
          placeholderTextColor={colors.placeholderText}
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={{ color: colors.white }}
          iconColor={colors.white}
          autoFocus
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 10,
    paddingBottom: Platform.OS === "ios" ? -12 : 18,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  inputSearch: {
    width: 263,
    height: 30,
    backgroundColor: colors.searchBarColor,
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.green,
    marginRight: "35%" // Interim Solution
  },
  searchBar: {
    backgroundColor: colors.searchBarColor,
    width: "75%",
    color: colors.white,
  },
});
