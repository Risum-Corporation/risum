import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import { GoBackButton } from "../../components/GoBackButton";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import { MemeCardSecondary } from "../../components/MemeCardSecondary";
import { posts } from "../../database/fakeData";
import SwitchMode from "../../styles/SwitchMode";
import { Searchbar } from "react-native-paper";

export function SavedMemes() {
  const navigation = useNavigation();

  // Theme
  let isSwitchOn = SwitchMode.isSwitchOn;

  return (
    <SafeAreaView
      style={[
        styles.container,
        isSwitchOn
          ? { backgroundColor: colors.backgroundLight }
          : { backgroundColor: colors.backgroundLight },
      ]}
    >
      <GoBackButton onPress={() => navigation.goBack()} />
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
            isSwitchOn ? { color: colors.greenLight } : { color: colors.green },
          ]}
        >
          Memes Salvos
        </Text>
        <View style={styles.savedMemes}>
          <FlatList
            data={posts}
            keyExtractor={(post) => String(post.id)}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) => <MemeCardSecondary postData={item} />}
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
