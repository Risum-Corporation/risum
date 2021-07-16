import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Feed() {
  const posts = [
    {
      id: "1",
      author: "Sapeka",
      meme_url: "https://source.unsplash.com/random/",
      likes: "43",
      mameTitle: "Tio patinhas 👃",
      tags: "#shipost",
      perfilPhoto: "https://source.unsplash.com/random/50x50",
      comments: "20",
    },
    {
      id: "2",
      author: "Sapeka",
      meme_url: "https://source.unsplash.com/random/",
      likes: "1223",
      mameTitle: "Tio patinhas 👃",
      tags: "#shipost",
      perfilPhoto: "https://source.unsplash.com/random/50x50",
      comments: "20",
    },
    {
      id: "3",
      author: "Sapeka",
      meme_url: "https://source.unsplash.com/random/",
      likes: "1223",
      mameTitle: "Tio patinhas 👃",
      tags: "#shipost",
      perfilPhoto: "https://source.unsplash.com/random/50x50",
      comments: "20",
    },
  ];

  function renderItem({ item: post }) {
    return (
      <View style={styles.post}>
        <View style={styles.container}>
          <Image style={styles.meme_url} source={{ uri: post.meme_url }} />
        </View>
        <View>
          <View style={styles.footer}>
            <View style={styles.actions}>
              <View style={styles.leftActions}>
                <TouchableOpacity style={styles.action}>
                  <AntDesign name="like2" size={24} color="white" />
                </TouchableOpacity>

                <Text style={styles.likes}>{post.likes}</Text>
                <TouchableOpacity style={styles.action}>
                  <Ionicons
                    name="md-chatbox-ellipses-outline"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>

                <Text style={styles.likes}>{post.comments}</Text>

                <TouchableOpacity>
                  <Ionicons
                    name="md-bookmark-outline"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Ionicons
                    name="md-share-social-outline"
                    size={24}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.userImgContainer}>
              <Text
                style={{
                  color: "white",
                  marginTop: 20,
                  fontSize: 14,
                  fontFamily: "userText",
                }}
              >
                {post.author}{"  "}
              </Text>
              <TouchableOpacity>
                <Image
                  source={{ uri: post.perfilPhoto }}
                  style={styles.userImg}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    marginVertical: 15,
  },
  container: {
    alignItems: "center",
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  postOptions: {},
  userInfo: {},
  author: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  place: {
    fontSize: 12,
    color: "#666",
  },
  meme_url: {
    width: "92.3%",
    height: 350,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: "cover", // object-fit
  },
  footer: {
    paddingHorizontal: 15,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    backgroundColor: "#242424",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  action: {
    marginRight: 8,
  },
  leftActions: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  likes: {
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "text",
    marginTop: 5,
    marginRight: 10,
    color: "white",
  },
  tags: {
    color: "#002D5E",
  },
  userImg: {
    width: 55,
    height: 55,
    borderRadius: 30,
  },
  userImgContainer: {
    flexDirection: "row",
    position: "absolute",
    marginLeft: 255,
    marginTop: -2,
  },
});
