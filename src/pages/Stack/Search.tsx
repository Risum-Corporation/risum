import React, { useContext, useState } from "react";
import { StyleSheet, Platform, SafeAreaView, View } from "react-native";

import { Searchbar, Button } from "react-native-paper";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";
import StackContext from "../../contexts/Stack";

export function Search() {
  // Theme
  const { isWhiteMode } = useContext(StackContext);

  // For menu navigation
  const navigation = useNavigation();

  function setSearchFalse() {
    setProfilePressed(false);
    setHyenaClanPressed(false);
    setMemePressed(false);
  }

  const [isProfilePressed, setProfilePressed] = useState<boolean>(true);
  const [isHyenaClanPressed, setHyenaClanPressed] = useState<boolean>();
  const [isMemePressed, setMemePressed] = useState<boolean>();

  const [searchQueryProfile, setSearchQueryProfile] = useState<string>("");
  const onChangeSearchProfile = (query: React.SetStateAction<string>) =>
    setSearchQueryProfile(query);

  const [searchQueryHyanaClan, setSearchQueryHyanaClan] = useState<string>("");
  const onChangeSearchHyanaClan = (query: React.SetStateAction<string>) =>
    setSearchQueryHyanaClan(query);

  const [searchQueryMeme, setSearchQueryMeme] = useState<string>("");
  const onChangeSearchMeme = (query: React.SetStateAction<string>) =>
    setSearchQueryMeme(query);

  return (
    <SafeAreaView style={isWhiteMode ? styles.wrapperLight : styles.wrapper}>
      <View style={styles.container}>
        <Searchbar
          placeholder={
            isProfilePressed
              ? `Pesquise por Usuários`
              : isHyenaClanPressed
              ? `Pesquise por Alcateias`
              : `Pesquise por Memes`
          }
          placeholderTextColor={colors.placeholderText}
          onChangeText={
            isProfilePressed
              ? onChangeSearchProfile
              : isHyenaClanPressed
              ? onChangeSearchHyanaClan
              : onChangeSearchMeme
          }
          value={
            isProfilePressed
              ? searchQueryProfile
              : isHyenaClanPressed
              ? searchQueryHyanaClan
              : searchQueryMeme
          }
          style={[
            styles.searchBar,
            {
              backgroundColor: isWhiteMode
                ? colors.lightBackgroundLight
                : colors.lightBackground,
            },
          ]}
          inputStyle={{ color: isWhiteMode ? colors.whiteLight : colors.white }}
          iconColor={colors.white}
          autoFocus
        />
      </View>
      <View style={styles.containerSelectSearch}>
        <Button
          mode="contained"
          uppercase={false}
          labelStyle={styles.labelSelectSearchType}
          onPress={() => {
            setSearchFalse();
            setProfilePressed(true);
          }}
          style={styles.isselectSearch}
          theme={{
            colors: {
              text: isWhiteMode ? colors.whiteLight : colors.white,
              primary: isWhiteMode
                ? isProfilePressed
                  ? colors.purpleLight
                  : colors.searchBarColorLight
                : isProfilePressed
                ? colors.purple
                : colors.searchBarColor,
            },
          }}
        >
          Usuários
        </Button>
        <Button
          mode="contained"
          labelStyle={styles.labelSelectSearchType}
          style={styles.isselectSearch}
          uppercase={false}
          onPress={() => {
            setSearchFalse();
            setHyenaClanPressed(true);
          }}
          theme={{
            colors: {
              text: isWhiteMode ? colors.whiteLight : colors.white,
              primary: isWhiteMode
                ? isHyenaClanPressed
                  ? colors.purpleLight
                  : colors.searchBarColorLight
                : isHyenaClanPressed
                ? colors.purple
                : colors.searchBarColor,
            },
          }}
        >
          Alcateias
        </Button>
        <Button
          mode="contained"
          labelStyle={styles.labelSelectSearchType}
          style={styles.isselectSearch}
          uppercase={false}
          onPress={() => {
            setSearchFalse();
            setMemePressed(true);
          }}
          theme={{
            colors: {
              text: isWhiteMode ? colors.whiteLight : colors.white,
              primary: isWhiteMode
                ? isMemePressed
                  ? colors.purpleLight
                  : colors.searchBarColorLight
                : isMemePressed
                ? colors.purple
                : colors.searchBarColor,
            },
          }}
        >
          Memes
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: Platform.OS === "ios" ? 15 : 0,
    marginBottom: Platform.OS === "ios" ? 15 : 11,
    alignContent: "center",
  },
  wrapper: {
    backgroundColor: colors.background,
    flex: 1,
  },
  wrapperLight: {
    backgroundColor: colors.backgroundLight,
    flex: 1,
  },
  isselectSearch: {
    width: 120,
  },
  labelSelectSearchType: {
    fontWeight: "bold",
    fontSize: 13,
    fontFamily: fonts.userText,
  },
  containerSelectSearch: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inputSearch: {
    height: 30,
    backgroundColor: colors.searchBarColor,
    borderRadius: 4,
    fontSize: 2,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.heading,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 6 : 0,
  },
  searchBar: {
    fontSize: 2,
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
