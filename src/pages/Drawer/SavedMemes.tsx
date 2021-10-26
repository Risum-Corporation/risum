import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { GoBackButton } from "../../components/GoBackButton";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import { MemeCardSecondary } from "../../components/MemeCardSecondary";
import { posts } from "../../database/fakeData";
import StackContext from "../../contexts/Stack";
import AuthContext from "../../contexts/Auth";
import { SafeZoneView } from "../../styles/Theme";

export function SavedMemes() {
  const navigation = useNavigation();
  const { isAnonymous, signOut } = useContext(AuthContext);

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View>
          <GoBackButton
            theme={isWhiteMode}
            onPress={() => navigation.goBack()}
          />
          <View style={styles.heading}>
            {/* Seria legal implementar uma searhbar aqui */}
            <Text
              style={[
                styles.title,
                isWhiteMode
                  ? { color: colors.greenLight }
                  : { color: colors.green },
              ]}
            >
              Memes Salvos
            </Text>
            <View style={styles.savedMemes}>
              <FlatList
                data={posts}
                keyExtractor={(post) => String(post.id)}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <MemeCardSecondary postData={item} theme={isWhiteMode} />
                )}
              />
            </View>
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    marginHorizontal: 50,
  },
  title: {
    fontFamily: fonts.heading,
    fontWeight: "bold",
    fontSize: 25,
    marginTop: "30%",
  },
  savedMemes: {
    marginTop: 20,
  },
  searchBar: {
    marginTop: 100,
  },
});
