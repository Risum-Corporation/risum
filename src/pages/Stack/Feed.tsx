import React, { useState, useEffect, useContext } from "react";
import { FlatList, StyleSheet, View, Platform, StatusBar} from "react-native";

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
import Animated from "react-native-reanimated";
const HEADER_HEIGHT = 70;

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
  
  const scrollY = new Animated.Value(0);
  const diffClampSrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  // const headerY = Animated.interpolate(diffClampSrollY, {
  //   inputRange: [0, HEADER_HEIGHT],
  //   outputRange: [0, -HEADER_HEIGHT],
  // })


  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View>
          {/* <Animated.View style={{
            height: HEADER_HEIGHT,
            transform: [{translateY: headerY}]
          }}> */}
          <TopBar theme={isWhiteMode} name="Feed"/> 
          {/* </Animated.View> */}

        <Animated.ScrollView
        // style={{paddingTop: HEADER_HEIGHT}}
        // bounces={false}
        // scrollEventThrottle={16}
        // onScroll={Animated.event([{nativeEvent: {contentOfset: {y: scrollY}}}])}
        >
          <View style={{marginTop: 10}}>
          {loading ? (
            <Loading />
          ) : (
            <FlatList
              data={posts}
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
            />
          )}
          </View>

        </Animated.ScrollView>
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
