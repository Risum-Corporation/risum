import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform, StatusBar
} from "react-native";
import colors from "../../styles/colors";

import { HypeTrainCard } from "../../components/HypeTrainCard";
import { posts } from "../../database/fakeData";
import { SafeAreaView } from "react-native-safe-area-context";
import StackContext from "../../contexts/Stack";

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

  const [visible, setVisible] = React.useState(true);

    // Theme
    const { isWhiteMode } = useContext(StackContext);

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={
          Platform.OS === "ios"
            ? isWhiteMode
              ? "dark-content"
              : "light-content"
            : "default"
        }
      />
      <View style={styles.container}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
