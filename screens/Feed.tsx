import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

import colors from "../styles/colors";

import { FeedBar } from "../components/FeedBar";
import { MemeCard } from '../components/MemeCard';

export default function Feed() {
  return (
    <View style={styles.container}>
      <View style={styles.headingPadding}></View>

            <MemeCard />
            <MemeCard />


    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  headingPadding: {
    marginBottom: 90
  }
});
