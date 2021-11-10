import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { ProfileProps } from "../database/fakeData";

interface ProfileItemProps {
  profileData: ProfileProps;
  theme: boolean;
}

const ProfileItem = ({ profileData, theme }: ProfileItemProps) => {
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
    >
      <Image source={{ uri: profileData.avatar }} style={styles.itemPhoto} />
      <View style={styles.itemInfo}>
        <Text
          style={[
            styles.userName,
            { color: theme ? colors.whiteLight : colors.white },
          ]}
        >
          {profileData.name}
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
