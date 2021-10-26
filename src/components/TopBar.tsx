import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";

import { Searchbar } from "react-native-paper";
import fonts from "../styles/fonts";
import colors from "../styles/colors";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../contexts/Auth";
import { Avatar } from "react-native-paper";

interface TopBarProps {
  name: string;
  theme: boolean;
}

export function TopBar({ name, theme }: TopBarProps) {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [isSearchPressed, setIsSearchPressed] = useState<boolean>();
  const { user, isAnonymous } = useContext(AuthContext);

  const onChangeSearch = (query: React.SetStateAction<string>) =>
    setSearchQuery(query);

  function handleSearchClick() {
    setIsSearchPressed(!isSearchPressed);
  }

  // For menu navigation
  const navigation = useNavigation();

  function handleDrawer() {
    return navigation.openDrawer();
  }

  function handleSearch(){
    navigation.navigate("Search")
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handleDrawer}>
        {isAnonymous ? (
          <Avatar.Image
            size={42}
            source={require("../assets/risumDefault.png")}
          />
        ) : user?.avatar ? (
          <Avatar.Image size={42} source={{ uri: user.avatar }} />
        ) : (
          <Avatar.Text size={42} label={`${user?.userName.substr(0, 1)}`} />
        )}
      </TouchableOpacity>

      {!isSearchPressed && (
        <Text
          style={[
            styles.title,
            { color: theme ? colors.greenLight : colors.green },
          ]}
        >
          {name}
        </Text>
      )}

      <TouchableOpacity onPress={handleSearch} style={{ marginRight: 5 }}>
        <AntDesign
          name={isSearchPressed ? "close" : "search1"}
          size={27}
          color={theme ? colors.whiteLight : colors.white}
        />
      </TouchableOpacity>

      {isSearchPressed && (
        <Searchbar
          placeholder="Pesquise por: Alcateias, perfis, memes..."
          placeholderTextColor={colors.placeholderText}
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={[
            styles.searchBar,
            {
              backgroundColor: theme
                ? colors.lightBackgroundLight
                : colors.lightBackground,
            },
          ]}
          inputStyle={{ color: theme ? colors.whiteLight : colors.white }}
          iconColor={colors.white}
          autoFocus
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: Platform.OS === "ios" ? 15 : 11,
    alignContent: "center",
  },
  inputSearch: {
    width: 263,
    height: 30,
    backgroundColor: colors.searchBarColor,
    borderRadius: 4,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.heading,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Platform.OS === "ios" ? 6 : 0,
  },
  searchBar: {
    maxWidth: "75%",
  },
  item: {
    backgroundColor: colors.lightBackground,
    color: colors.white,
  },
  itemTitle: {
    color: colors.white,
    fontFamily: fonts.subtitle,
  },
});
