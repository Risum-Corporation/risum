import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, SafeAreaView } from "react-native";

import colors from "../../styles/colors";
import { TopBar } from "../../components/TopBar";
import StackContext from "../../contexts/Stack";
import { ScrollView } from "react-native-gesture-handler";
import { SafeZoneView } from "../../styles/Theme";
import { HCInfo } from "../../components/HCInfo";
import AuthContext from "../../contexts/Auth";
import fonts from "../../styles/fonts";
import { NotInHyenaClan } from "../../components/NotInHyenaClan";

import firebase from "../../database/firebaseConnection";

export interface HyenaClan {
  id: string;
  name: string; // Nome da alcateia
  shield?: string | null; // Foto da alcateia
  cover?: string | null; // Wallpaper de fundo da alcateia
  members: number;
}

export function HyenaClan() {
  // Theme
  const { isWhiteMode } = useContext(StackContext);

  const { user } = useContext(AuthContext);

  const [hyenaClan, setHyenaClan] = useState<HyenaClan>();
  const [isInHyenaClan, setIsInHyenaClan] = useState<boolean>();

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

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        isInHyenaClan && hyenaClan ? (
          <ScrollView>
            <TopBar name={hyenaClan.name} theme={isWhiteMode} />

            <View style={styles.HCInfoContainer}>
              <HCInfo
                theme={isWhiteMode}
                cover={hyenaClan?.cover}
                hyenaShield={hyenaClan?.shield}
                members={hyenaClan.members}
                adms={8}
                memeRank={9}
              />
            </View>
          </ScrollView>
        ) : (
          <NotInHyenaClan />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  HCInfoContainer: {
    marginTop: 15,
  },
  text: {
    fontFamily: fonts.text,
    color: colors.white,
    fontSize: 32,
  },
});
