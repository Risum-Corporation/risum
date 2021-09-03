import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  View,
  SafeAreaView,
} from "react-native";

import { Searchbar } from "react-native-paper";
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
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // For menu navigation
  const navigation = useNavigation();

  function handleProfile() {
    return navigation.navigate("Profile");
  }

  function handleDrawer() {
    return navigation.openDrawer();
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleProfile} onLongPress={handleDrawer}>
        <Image
          source={require("../assets/profilePicture.png")}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {!isSearchPressed && <Text style={styles.title}>{props.name}</Text>}

      <TouchableOpacity onPress={handleSearchClick} style={{ marginRight: 5 }}>
        <AntDesign
          name={isSearchPressed ? "close" : "search1"}
          size={27}
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
    marginHorizontal: Platform.OS === "ios" ? 15 : 0,
    marginBottom: Platform.OS === "ios" ? 20 : 11,
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
    color: colors.green,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 6 : 0,
  },
  searchBar: {
    backgroundColor: colors.searchBarColor,
    color: colors.white,
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
