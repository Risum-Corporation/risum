import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

import { posts } from "../database/fakeData";

import colors from "../styles/colors";
import { Image } from "react-native";
import { Banner } from "react-native-paper";
import { TopBar } from "../components/TopBar";
import { MemeCard } from "../components/MemeCard";
import { Loading } from "../components/Loading";
import { EmbledWP } from "../components/EmbledHC";

export function WolfPack() {
  return (
    <View style={styles.wrapper}>
      <TopBar name="CupForce" />
      <EmbledWP />

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    height: '100%'
  },
});
