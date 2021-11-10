import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { User } from "../contexts/Auth";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { Avatar } from "react-native-paper";

interface ProfileItemProps {
  profileData: User;
  theme: boolean;
}

const ProfileItem = ({ profileData, theme }: ProfileItemProps) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          borderBottomColor: theme
            ? colors.placeholderTextLight
            : colors.divider,
        },
      ]}
      onPress={() =>
        navigation.navigate("Profile", { userId: profileData.userId })
      }
    >
      {profileData.avatar ? (
        <Avatar.Image
          style={styles.itemPhoto}
          source={{ uri: profileData.avatar }}
        />
      ) : (
        <Avatar.Text
          style={styles.itemPhoto}
          label={`${profileData.userName.substr(0, 1)}`}
        />
      )}
      <View style={styles.itemInfo}>
        <Text
          style={[
            styles.userName,
            { color: theme ? colors.whiteLight : colors.white },
          ]}
        >
          {profileData.userName}
        </Text>
        <Text
          style={[
            styles.userTag,
            {
              color: theme
                ? colors.placeholderTextLight
                : colors.placeholderText,
            },
          ]}
        >
          #{profileData.tag}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    marginLeft: 30,
    marginRight: 30,
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
  },
  itemPhoto: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  itemInfo: {
    marginLeft: 20,
  },
  userName: {
    fontSize: 22,
    marginBottom: 5,
    fontFamily: fonts.subtitle,
  },
  userTag: {
    fontSize: 18,
    fontFamily: fonts.text,
  },
});

export default ProfileItem;
