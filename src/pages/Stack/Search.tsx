import React from "react";
import { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Platform,
} from "react-native";
import ProfileItem from "../../components/ProfileItem";
import StackContext from "../../contexts/Stack";

import firebase from "../../database/firebaseConnection";

import { PostProps } from "../../database/interfaces";
import { SafeZoneView } from "../../styles/Theme";
import { Searchbar, Button } from "react-native-paper";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { GoBackButton } from "../../components/GoBackButton";
import { useNavigation } from "@react-navigation/native";
import HyenaClanItem from "../../components/HyenaClanItem";

interface ProfileProps {
  uid: string;
  userName: string;
  tag: string;
  avatar: string | null;
}

interface HyenaProps {
  id: string;
  name: string;
  shield: string;
  members: string[];
}

export function Search() {
  // Theme
  const { isWhiteMode } = useContext(StackContext);

  const [profileQuery, setProfileQuery] = useState<string>("");
  const [hyenaClanQuery, setHyenaClanQuery] = useState<string>("");
  const [memeQuery, setMemeQuery] = useState<string>("");

  const navigation = useNavigation();

  // Lista de pessoas pesquisadas
  const [profileList, setProfileList] = useState<Record<string, ProfileProps>>(
    {}
  );

  // Lista de alcateias pesquisadas
  const [hyenaClanList, setHyenaClanList] = useState<
    Record<string, HyenaProps>
  >({}); // Tipagem <HyenaClan[]>

  // Lista de memes pesquisados
  const [memeList, setMemeList] = useState<PostProps[]>();

  function setSearchFalse() {
    setProfilePressed(false);
    setHyenaClanPressed(false);
    setMemePressed(false);
    setProfileList({});
  }

  const [isProfilePressed, setProfilePressed] = useState<boolean>(true);
  const [isHyenaClanPressed, setHyenaClanPressed] = useState<boolean>();
  const [isMemePressed, setMemePressed] = useState<boolean>();

  async function searchProfile() {
    if (profileQuery === "") {
      console.log("Query vazia");
      setProfileList({});
      // Dizer para o usuário pesquisar algo
    } else {
      const docs = await firebase
        .firestore()
        .collection("users")
        .where("userName", "<=", profileQuery)
        .get();

      let newProfile = profileList;

      docs.forEach(async (doc) => {
        const userName = doc.data().userName;

        if (userName.toLowerCase().indexOf(profileQuery?.toLowerCase()) > -1) {
          // Informações do perfil
          const uid = doc.data().uid;
          const userName = doc.data().userName;
          const tag = doc.data().tag;
          const avatar = doc.data().avatar;

          newProfile = {
            ...newProfile,
            [uid]: {
              uid,
              userName,
              tag,
              avatar,
            },
          };

          // Atualiza a lista de perfis
          setProfileList(newProfile);
        }
      });
    }
  }

  async function searchHyenaClan() {
    if (hyenaClanQuery === "") {
      console.log("Query vazia");
      setHyenaClanList({});
      // Dizer para o usuário pesquisar algo
    } else {
      const docs = await firebase
        .firestore()
        .collection("hyenaClans")
        .where("name", "<=", hyenaClanQuery)
        .get();

      let newHyenaClan = hyenaClanList;

      docs.forEach(async (doc) => {
        const name = doc.data().name;

        if (name.toLowerCase().indexOf(profileQuery?.toLowerCase()) > -1) {
          // Informações do perfil
          const id = doc.data().id;
          const name = doc.data().name;
          const shield = doc.data().shield;
          const members = doc.data().members;

          newHyenaClan = {
            ...newHyenaClan,
            [id]: {
              id,
              name,
              shield,
              members,
            },
          };

          // Atualiza a lista de perfis
          setHyenaClanList(newHyenaClan);
          console.log(hyenaClanList);
        }
      });
    }
  }

  // Executada quando o usuário digitar alguma coisa no text input de usuários
  useEffect(() => {
    searchProfile();
  }, [profileQuery]);

  // Executada quando o usuário digitar alguma coisa no text input de alcateias
  useEffect(() => {
    searchHyenaClan();
  }, [hyenaClanQuery]);

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
              onChangeText={(t: string) => {
                isProfilePressed
                  ? setProfileQuery(t)
                  : isHyenaClanPressed
                  ? setHyenaClanQuery(t)
                  : setMemeQuery(t);
              }}
              value={
                isProfilePressed
                  ? profileQuery
                  : isHyenaClanPressed
                  ? hyenaClanQuery
                  : memeQuery
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
              data={Object.values(profileList)}
              style={styles.profileList}
              renderItem={({ item }) => (
                <ProfileItem theme={isWhiteMode} profileData={item} />
              )}
              keyExtractor={(item) => String(item.uid)}
            />
          )}
          {isHyenaClanPressed && (
            <FlatList
              data={Object.values(hyenaClanList)}
              style={styles.profileList}
              renderItem={({ item }) => (
                <HyenaClanItem theme={isWhiteMode} hyenaClanData={item} />
              )}
              keyExtractor={(item) => String(item.id)}
            />
          )}
          <GoBackButton
            theme={isWhiteMode}
            onPress={() => navigation.goBack()}
          />
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
  profileList: {
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
});
