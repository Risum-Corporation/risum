import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View, Platform, Animated } from "react-native";

import { fakePosts } from "../../database/fakeData";

import colors from "../../styles/colors";
import { TopBar } from "../../components/TopBar";
import { MemeCard } from "../../components/MemeCard";
import StackContext from "../../contexts/Stack";
import { SafeZoneView } from "../../styles/Theme";

export function Feed() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  function loadPage(pageNumber = page) {
    if (total && pageNumber > total) return;

    const totalItems = fakePosts.length;

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

  const scrollY = new Animated.Value(0);
  const TOPBARHEIGHT = 90;
  const diffClamp = Animated.diffClamp(scrollY, 0, TOPBARHEIGHT);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 70],
    outputRange: [0, -TOPBARHEIGHT],
  });

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <>
        
          <Animated.View
            style={{
              transform: [{ translateY }],
              elevation: 4,
              zIndex: 150,
          
            }}
          >
            <TopBar name="Feed" theme={isWhiteMode} />
          </Animated.View>

          <FlatList
            data={fakePosts}
            keyExtractor={(post) => String(post.id)}
            onEndReached={() => loadPage()}
            onEndReachedThreshold={0.1}
            onRefresh={refreshList}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            renderItem={({ item }) => (
              <MemeCard postData={item} theme={isWhiteMode} />
            )}
            maxToRenderPerBatch={5}
            onScroll={(e) => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
          />
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
  },
  wrapperLight: {
    backgroundColor: colors.backgroundLight,
  },
});
