import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { GoBackButton } from "../../components/GoBackButton";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import { MemeCardSecondary } from "../../components/MemeCardSecondary";
import { posts } from "../../database/fakeData";

import { Searchbar } from 'react-native-paper';


export function SavedMemes() {
  const navigation = useNavigation();


  return (
    <SafeAreaView style={styles.container}>
      <GoBackButton onPress={() => navigation.goBack()} />
      <View style={styles.heading}>
     {/* <View style={styles.searchBar}>
      <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
    </View> */}
        <Text style={styles.title}>Memes Salvos</Text>
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
    backgroundColor: colors.background,
  },
  heading: {
    marginHorizontal: 50,
  },
  title: {
    color: colors.green,
    fontFamily: fonts.heading,
    fontWeight: "bold",
    fontSize: 25,
    marginTop: "30%",
  },
  savedMemes: {
    marginTop: 20
  },
  searchBar: {
    marginTop: 100
  }
  
});
