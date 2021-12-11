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

import { ReducedPostProps } from "../../database/interfaces";
import { SafeZoneView } from "../../styles/Theme";
import { Searchbar, Button } from "react-native-paper";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { GoBackButton } from "../../components/GoBackButton";
import { useNavigation } from "@react-navigation/native";
import HyenaClanItem from "../../components/HyenaClanItem";
import { MemeCard } from "../../components/MemeCard";

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
  const [memeList, setMemeList] = useState<Record<string, ReducedPostProps>>(
    {}
  );

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
        //.where("userName", ">=", profileQuery)
        .limit(10)
        .get();

      let newProfile = profileList;

      docs.forEach(async (doc) => {
        const userName = doc.data().userName;
        const uid = doc.data().uid;

        // Caso o userName do perfil seja equivalente ao Query e o uid já não esteja presente na lista
        if (
          userName.toLowerCase().indexOf(profileQuery?.toLowerCase()) > -1 &&
          !Object.keys(profileList).includes(uid)
        ) {
          // Informações do perfil
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
        //.where("name", ">=", hyenaClanQuery)
        .limit(10)
        .get();

      let newHyenaClan = hyenaClanList;

      docs.forEach(async (doc) => {
        const name = doc.data().name;
        const id = doc.data().id;

        // Caso o nome da alcateia seja equivalente ao Query e o seu id já não esteja presente na lista
        if (
          name.toLowerCase().indexOf(hyenaClanQuery?.toLowerCase()) > -1 &&
          !Object.keys(hyenaClanList).includes(id)
        ) {
          // Informações da alcateia
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

  async function searchMeme() {
    if (memeQuery === "") {
      console.log("Query vazia");
      setMemeList({});
      // Dizer para o usuário pesquisar algo
    } else {
      const docs = await firebase
        .firestore()
        .collection("memes")
        //.where("memeTitle", ">=", memeQuery)
        .limit(10)
        .get();

      let newMemes = memeList;

      docs.forEach(async (doc) => {
        const memeTitle = doc.data().memeTitle;
        const memeTags = doc.data().tags;
        const id = doc.data().id;

        // Caso o nome do meme seja equivalente ao Query e o seu id já não esteja presente na lista
        if (
          (memeTitle.toLowerCase().indexOf(memeQuery?.toLowerCase()) > -1 ||
            memeTags.toLowerCase().indexOf(memeQuery?.toLowerCase()) > -1) &&
          !Object.keys(memeList).includes(id)
        ) {
          // Informações do meme
          const authorId = doc.data().authorId;
          const memeUrl = doc.data().memeUrl;
          const likes = doc.data().likes;
          const comments = doc.data().comments;
          const isVideo = doc.data().isVideo;

          newMemes = {
            ...newMemes,
            [id]: {
              id,
              authorId,
              memeUrl,
              likes,
              comments,
              isVideo,
            },
          };

          // Atualiza a lista de perfis
          setMemeList(newMemes);
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

  // Executada quando o usuário digitar alguma coisa no text input de memes
  useEffect(() => {
    searchMeme();
  }, [memeQuery]);

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
              inverted
              data={Object.values(profileList)}
              style={styles.list}
              renderItem={({ item }) => (
                <ProfileItem theme={isWhiteMode} profileData={item} />
              )}
              keyExtractor={(item) => String(item.uid)}
            />
          )}
          {isHyenaClanPressed && (
            <FlatList
              inverted
              data={Object.values(hyenaClanList)}
              style={styles.list}
              renderItem={({ item }) => (
                <HyenaClanItem theme={isWhiteMode} hyenaClanData={item} />
              )}
              keyExtractor={(item) => String(item.id)}
            />
          )}
          {isMemePressed && (
            <FlatList
              inverted
              data={Object.values(memeList)}
              style={styles.list}
              renderItem={({ item }) => (
                <MemeCard theme={isWhiteMode} postData={item} />
              )}
              keyExtractor={(item) => String(item.id)}
            />
          )}
          {/* <GoBackButton
            theme={isWhiteMode}
            onPress={() => navigation.goBack()}
          /> */}
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
