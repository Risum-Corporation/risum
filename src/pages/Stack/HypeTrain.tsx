import React, { useState, useEffect, useContext } from "react";

import { StyleSheet, View } from "react-native";
import { posts } from "../../database/fakeData";
import { SafeAreaView } from "react-native-safe-area-context";
import StackContext from "../../contexts/Stack";
import { SafeZoneView, SimpleText } from "../../styles/Theme";
export function HypeTrain() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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

  const [visible, setVisible] = useState(true);

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  return ( <SafeZoneView
    theme={isWhiteMode}
    content={
      <View style={styles.container}>
        <SimpleText theme={isWhiteMode} title="HypeTrain" size={30}/>
      </View>
    }
  />);
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: 250,
    height: 250,
  },
});
