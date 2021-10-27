import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View, Platform, StatusBar } from "react-native";

import { posts } from "../../database/fakeData";

import colors from "../../styles/colors";
import { TopBar } from "../../components/TopBar";
import { MemeCard } from "../../components/MemeCard";
import StackContext from "../../contexts/Stack";
import { Loading } from "../../components/Loading";
import EmailVerify from "../../components/EmailVerify";
import AuthContext from "../../contexts/Auth";
import { SafeZoneView } from "../../styles/Theme";
import { ScrollView } from "react-native-gesture-handler";

export function Feed() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Theme
  const { isWhiteMode } = useContext(StackContext);
  const { isEmailVerified } = useContext(AuthContext);

  function loadPage(pageNumber = page) {
    if (total && pageNumber > total) return;

    const totalItems = posts.length;

    setTotal(Math.floor(totalItems / 5));
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadPage();
  }, []);

  function refreshList() {
    setRefreshing(true);

    loadPage(1);

    setRefreshing(false);
  }
  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View>
          <TopBar theme={isWhiteMode} name="Feed"/> 

        <ScrollView>
          <View style={styles.box}/>
          <View style={styles.box}/>

          <View style={styles.box}/>
          <View style={styles.box}/>
          <View style={styles.box}/>
          <View style={styles.box}/>

        </ScrollView>
        </View>

      }
    />
  );
}

const styles = StyleSheet.create({
warningContainer:{
  marginTop: 10
},
box: {
  height: 300,
  width: "100%",
  backgroundColor: 'gray',
  marginBottom: 10
}
});
