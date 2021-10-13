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

export function SavedMemes() {
  const navigation = useNavigation();
  const { isAnonymous, signOut } = useContext(AuthContext);

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  return (
    <SafeAreaView
      style={[
        styles.container,
        isWhiteMode
          ? { backgroundColor: colors.backgroundLight }
          : { backgroundColor: colors.background },
      ]}
    >
      <GoBackButton theme={isWhiteMode} onPress={() => navigation.goBack()} />
      <View style={styles.heading}>
        {/* <View style={styles.searchBar}>
      <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
    </View> */}
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
    </SafeAreaView>
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
