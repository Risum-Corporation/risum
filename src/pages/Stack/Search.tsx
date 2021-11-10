import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListItem from "../../components/ProfileItem";
import StackContext from "../../contexts/Stack";

import { fakeProfiles } from "../../database/fakeData";
import { SafeZoneView } from "../../styles/Theme";
import { Searchbar, Button } from "react-native-paper";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export function Search() {
  // Theme
  const { isWhiteMode } = useContext(StackContext);

  const [searchProfile, setSearchProfile] = useState("");
  const [searchHyanaClan, setSearchHyanaClan] = useState("");
  const [searchMeme, setSearchMeme] = useState("");

  const [list, setList] = useState(fakeProfiles);

  function setSearchFalse() {
    setProfilePressed(false);
    setHyenaClanPressed(false);
    setMemePressed(false);
  }

  const [isProfilePressed, setProfilePressed] = useState<boolean>(true);
  const [isHyenaClanPressed, setHyenaClanPressed] = useState<boolean>();
  const [isMemePressed, setMemePressed] = useState<boolean>();

  useEffect(() => {
    if (searchProfile === "") {
      setList(fakeProfiles);
    } else {
      setList(
        fakeProfiles.filter(
          (item) =>
            item.name.toLowerCase().indexOf(searchProfile.toLowerCase()) > -1
        )
      );
    }
  }, [searchProfile]);
  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <SafeAreaView style={styles.container}>
          <View style={styles.searchArea}>
            <Searchbar
              placeholder={
                isProfilePressed
                  ? `Pesquise por Usuários`
                  : isHyenaClanPressed
                  ? `Pesquise por Alcateias`
                  : `Pesquise por Memes`
              }
              placeholderTextColor={colors.placeholderText}
              onChangeText={(t) => setSearchProfile(t)}
              value={
                isProfilePressed
                  ? searchProfile
                  : isHyenaClanPressed
                  ? searchHyanaClan
                  : searchMeme
              }
              style={[
                styles.searchBar,
                {
                  backgroundColor: isWhiteMode
                    ? colors.lightBackgroundLight
                    : colors.lightBackground,
                },
              ]}
              inputStyle={{
                color: isWhiteMode ? colors.whiteLight : colors.white,
              }}
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
          {isProfilePressed && (
            <FlatList
              data={list}
              style={styles.list}
              renderItem={({ item }) => (
                <ListItem theme={isWhiteMode} profileData={item} />
              )}
              keyExtractor={(item) => item.id}
            />
          )}
        </SafeAreaView>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "#363636",
    margin: 30,
    borderRadius: 5,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 15,
    color: "#FFFFFF",
  },
  searchArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: Platform.OS === "ios" ? 15 : 0,
    marginBottom: Platform.OS === "ios" ? 15 : 11,
    alignContent: "center",
  },
  orderButton: {
    width: 32,
    marginRight: 30,
  },
  list: {
    flex: 1,
  },
  sselectSearch: {
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
