import React, { useState, useEffect, useContext } from "react";

import { StyleSheet, View } from "react-native";
import StackContext from "../../contexts/Stack";
import { fakePosts } from "../../database/fakeData";
import { SafeZoneView, SimpleText } from "../../styles/Theme";
import { Video } from "expo-av";
export function HypeTrain() {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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

  const [visible, setVisible] = useState(true);

  // Theme
  const { isWhiteMode } = useContext(StackContext);

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({})

  return (
    <SafeZoneView
      theme={isWhiteMode}
      content={
        <View style={styles.container}>
          <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
        </View>
      }
    />
  );
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
  video: {
    height: 400,
    width: 400
  }
});
