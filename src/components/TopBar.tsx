import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import Constants from "expo-constants";

import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar } from "react-native-paper";
import fonts from "../styles/fonts";
import colors from "../styles/colors";
import { useState } from "react";

import { AntDesign } from "@expo/vector-icons";

const statusBarHeight =
  Platform.OS === "android" ? Constants.statusBarHeight : 0;

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

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <Image
          source={require("../assets/profilePicture.png")}
          style={styles.avatar}
        />
      </TouchableOpacity>
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
  },
  searchBar: {
    backgroundColor: colors.searchBarColor,
    width: "75%",
    color: colors.white,
  },
});
