import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  SafeAreaView,
} from "react-native";

import { Searchbar } from "react-native-paper";
import fonts from "../styles/fonts";
import colors from "../styles/colors";
import { useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import SwitchMode from "../styles/SwitchMode";
import AuthContext from "../contexts/Auth";

interface TopBarProps {
  name: string;
  iconColor: string;
  textColor: string;
  searchBackgroundColor: string;
  searchColor: string;
}

export function TopBar({
  name,
  iconColor,
  textColor,
  searchBackgroundColor,
  searchColor,
}: TopBarProps) {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [isSearchPressed, setIsSearchPressed] = useState<boolean>();
  const { user } = useContext(AuthContext);

  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

  function handleSearchClick() {
    setIsSearchPressed(!isSearchPressed);
  }

  // For menu navigation
  const navigation = useNavigation();

  function handleDrawer() {
    return navigation.openDrawer();
  }

  // Theme
  let isSwitchOn = SwitchMode.isSwitchOn;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleDrawer}>
        <Image
          source={{
            uri: "https://marcas-logos.net/wp-content/uploads/2020/03/MOZILLA-FIREFOX-LOGO.png",
          }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {!isSearchPressed && (
        <Text style={[styles.title, { color: textColor }]}>{name}</Text>
      )}

      <TouchableOpacity onPress={handleSearchClick} style={{ marginRight: 5 }}>
        <AntDesign
          name={isSearchPressed ? "close" : "search1"}
          size={27}
          color={iconColor}
        />
      </TouchableOpacity>

      {isSearchPressed && (
        <Searchbar
          placeholder="Pesquise por: Alcateias, perfis, memes..."
          placeholderTextColor={colors.placeholderText}
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={[styles.searchBar, { backgroundColor: searchBackgroundColor }]}
          inputStyle={{ color: searchColor }}
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
    marginHorizontal: Platform.OS === "ios" ? 15 : 0,
    marginBottom: Platform.OS === "ios" ? 15 : 11,
    alignContent: "center",
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
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 6 : 0,
  },
  searchBar: {
    maxWidth: "75%",
  },
  item: {
    backgroundColor: colors.lightBackground,
    color: colors.white,
  },
  itemTitle: {
    color: colors.white,
    fontFamily: fonts.subtitle,
  },
});
