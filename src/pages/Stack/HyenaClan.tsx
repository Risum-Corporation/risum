import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  FlatList,
  Animated,
  Platform,
} from "react-native";

import colors from "../../styles/colors";
import { TopBar } from "../../components/TopBar";
import StackContext from "../../contexts/Stack";
import { ScrollView } from "react-native-gesture-handler";
import { SafeZoneView } from "../../styles/Theme";
import { HCInfo } from "../../components/HCInfo";
import AuthContext from "../../contexts/Auth";
import fonts from "../../styles/fonts";
import { NotInHyenaClan } from "../../components/NotInHyenaClan";

import { HyenaClanProps, PostProps } from "../../database/interfaces";

import firebase from "../../database/firebaseConnection";
import { MemeCard } from "../../components/MemeCard";

export function HyenaClan() {
  // Theme
  const { isWhiteMode } = useContext(StackContext);

  const { user } = useContext(AuthContext);

  const [hyenaClan, setHyenaClan] = useState<HyenaClanProps>();
  const [isInHyenaClan, setIsInHyenaClan] = useState<boolean>();
  const [loading, setLoading] = useState(true);

  const [isRefreshing, setIsRefreshing] = useState(false);

  // Objeto de memes recebidos do Firestore
  const [memeList, setMemeList] = useState<Record<string, PostProps>>({});

  const [page, setPage] = useState(1);

  const scrollY = new Animated.Value(0);
  const TOPBARHEIGHT = 90;
  const diffClamp = Animated.diffClamp(scrollY, 0, TOPBARHEIGHT);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 70],
    outputRange: [0, -TOPBARHEIGHT],
  });

  async function loadHCMemes(pageNumber = page) {
    const docs = await firebase
      .firestore()
      .collection("memes")
      .where("authorId", "in", hyenaClan?.members)
      .get();

    let newMemes = { ...memeList };

    // Percorre os documentos (memes) um a um
    docs.forEach((doc) => {
      // Recebe cada uma das informações do meme no Firestore
      const id = doc.data().id;
      const memeUrl = doc.data().memeUrl;
      const likes = doc.data().likes;
      const comments = doc.data().comments;
      const authorId = doc.data().authorId;
      const isVideo = doc.data().isVideo;

      // Atualiza a lista de memes, acrescentando UM novo objeto referente a UM novo meme
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
    });

    setMemeList(newMemes);
  }

  function refreshList() {
    setIsRefreshing(true);
    setLoading(true);

    // Zera o Objeto com os memes
    setMemeList({});

    loadHCMemes();

    setIsRefreshing(false);
    setLoading(false);
  }

  useEffect(() => {
    async function verifyHyenaClan() {
      if (user?.hyenaClanId) {
        await firebase
          .firestore()
          .collection("hyenaClans")
          .doc(user.hyenaClanId)
          .get()
          .then((doc) => {
            const id = user.hyenaClanId!;
            const name = doc.data()?.name;
            const shield = doc.data()?.shield;
            const cover = doc.data()?.cover;
            const members = doc.data()?.members;

            setHyenaClan({ id, name, shield, cover, members });
          });
        setIsInHyenaClan(true);
      } else {
        setIsInHyenaClan(false);
      }
    }

    verifyHyenaClan();
  }, [user?.hyenaClanId]);

  useEffect(() => {
    if (isInHyenaClan) {
      loadHCMemes();
    }
  }, [isInHyenaClan]);

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        isInHyenaClan && hyenaClan ? (
          <>
            <Animated.View
              style={{
                transform: [{ translateY }],
                zIndex: 150,
                position: "absolute",
                width: "100%",
                marginTop: Platform.OS === "ios" ? 47 : 0,
              }}
            >
              <TopBar name={hyenaClan.name} theme={isWhiteMode} />
            </Animated.View>

            <View style={styles.memeList}></View>
            <FlatList
              data={Object.values(memeList)}
              ListHeaderComponent={
                <HCInfo
                  theme={isWhiteMode}
                  cover={hyenaClan?.cover}
                  hyenaShield={hyenaClan?.shield}
                  members={hyenaClan.members.length}
                  adms={0}
                  memeRank={9}
                />
              }
              keyExtractor={(post) => String(post.id)}
              onEndReached={() => loadHCMemes()}
              onEndReachedThreshold={0.1}
              onRefresh={refreshList}
              showsVerticalScrollIndicator={false}
              refreshing={isRefreshing}
              renderItem={({ item }) => (
                <MemeCard postData={item} theme={isWhiteMode} />
              )}
              maxToRenderPerBatch={5}
              onScroll={(e) => {
                scrollY.setValue(e.nativeEvent.contentOffset.y);
              }}
            />
          </>
        ) : (
          <NotInHyenaClan />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  HCInfoContainer: {
    marginTop: 120,
  },
  text: {
    fontFamily: fonts.text,
    color: colors.white,
    fontSize: 32,
  },
  memeList: {
    marginTop: 120,
  },
});
