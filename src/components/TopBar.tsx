import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, Platform, TextInput} from "react-native";
import Constants from 'expo-constants';

import { Ionicons } from '@expo/vector-icons';

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar } from 'react-native-paper';
import { useState } from "react";

const statusBarHeight = Platform.OS === 'android' ? Constants.statusBarHeight : 0


interface TopBarProps {
  name: string;
}

interface SearchBarProps {
  placeholder: string
}

export function TopBar(props: TopBarProps) {

  const MyComponent = () => {
    const [searchQuery, setSearchQuery] = React.useState('');
  
    const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);
  
    return (
      <Searchbar
        placeholder="Pesquise por: Alcateias, perfis, memes..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        re

      />
    );
  };

  return (
    <SafeAreaView  style={[styles.container, {}]}>
    <TouchableOpacity style={styles.avatar}></TouchableOpacity>
    <MyComponent />


    </SafeAreaView >
  );
}

const styles = StyleSheet.create({

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 10,
    paddingBottom: Platform.OS === 'ios' ? -12 : 18
  },
  avatar: {
    backgroundColor: 'white',
    width: 55,
    height: 55,
    borderRadius: 30
  },
  inputSearch: {
    width: 263,
    height: 30,
    backgroundColor: '#292929',
    borderRadius: 4,
    

  }

  
});
