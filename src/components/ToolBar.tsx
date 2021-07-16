import React, { useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from "@expo/vector-icons";

import { SvgFromUri } from "react-native-svg";

import colors from "../styles/colors";

import { useNavigation } from "@react-navigation/core";

export function ToolBar() {
  const navigation = useNavigation();
  const [isFeedClicked, setIsFeedClicked] = useState<boolean>();
  const [isHypeTrainClicked, setIsHypeTrainClicked] = useState<boolean>();
  const [isWolfPackClicked, setIsWolfPackClicked] = useState<boolean>();
  const [isAddMemeClicked, setIsAddMemeClicked] = useState<boolean>();

  function setEverythingFalse() {
    setIsFeedClicked(false);
    setIsHypeTrainClicked(false);
    setIsWolfPackClicked(false);
    setIsAddMemeClicked(false);
  }

  function handleFeedClick() {
    setEverythingFalse();
    setIsFeedClicked(true);
    navigation.navigate("Feed");
  }
  function handleHypeTrainClick() {
    setEverythingFalse();
    setIsHypeTrainClicked(true);
    navigation.navigate("HypeTrain");
  }
  function handleWolfPackClick() {
    setEverythingFalse();
    setIsWolfPackClicked(true);
    navigation.navigate("WolfPack");
  }
  function handleAddMemeClick() {
    setEverythingFalse();
    setIsAddMemeClicked(true);
    navigation.navigate("AddMeme");
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={handleFeedClick}>
          <AntDesign
            name={isFeedClicked ? "star" : "staro"}
            size={30}
            color={isFeedClicked ? colors.green : colors.white}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleHypeTrainClick}>
          <Ionicons
            name={isHypeTrainClicked ? "train" : "train-outline"}
            size={30}
            color={isHypeTrainClicked ? colors.green : colors.white}
          />
        </TouchableOpacity>

        {/* <SvgFromUri /> Svg do risum aqui */}

        <TouchableOpacity onPress={handleWolfPackClick}>
          <MaterialCommunityIcons
            name={isWolfPackClicked ? "account-group" : "account-group-outline"}
            size={30}
            color={isWolfPackClicked ? colors.green : colors.white}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAddMemeClick}>
          <Feather
            name="plus-circle"
            size={30}
            color={isAddMemeClicked ? colors.green : colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 25,
    position: "absolute",
    bottom: 1,
    backgroundColor: colors.lightBackground,
  },
  wrapper: {
    marginHorizontal: 25,
    justifyContent: "space-between",
    alignItems: "center",
    height: 35,
    marginVertical: 10,
    flexDirection: "row",
  },
});
