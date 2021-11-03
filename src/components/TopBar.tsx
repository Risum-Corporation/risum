import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  View,
} from "react-native";
import { Appbar } from "react-native-paper";
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

  function handleSearch() {
    navigation.navigate("Search");
  }

  return (
    <View style={styles.container}>
      <Appbar.Header
        style={{
          backgroundColor: theme ? colors.backgroundLight : colors.background,
          paddingHorizontal: 15,
        }}
      >
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
        <Appbar.Content
          titleStyle={[
            styles.title,
            { color: theme ? colors.greenLight : colors.green },
          ]}
          title={name}
        />
        <Appbar.Action icon="magnify" onPress={handleSearch} />
      </Appbar.Header>
      {/* <Text>gg</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    // backgroundColor: "red",
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
  },
});
