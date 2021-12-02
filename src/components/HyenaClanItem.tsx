import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { Avatar } from "react-native-paper";

interface HyenaClanItemProps {
  hyenaClanData: {
    id: string;
    name: string;
    shield: string | null;
    members: string[];
  };
  theme: boolean;
}

const HyenaClanItem = ({ hyenaClanData, theme }: HyenaClanItemProps) => {
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
      onPress={() => navigation.navigate("HyenaClan")}
    >
      {hyenaClanData.shield ? (
        <Avatar.Image
          style={styles.itemPhoto}
          source={{ uri: hyenaClanData.shield }}
        />
      ) : (
        <Avatar.Text
          style={styles.itemPhoto}
          label={hyenaClanData.name.substr(0, 1)}
        />
      )}
      <View style={styles.itemInfo}>
        <Text
          style={[
            styles.name,
            { color: theme ? colors.whiteLight : colors.white },
          ]}
        >
          {hyenaClanData.name}
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
          {hyenaClanData.members.length}{" "}
          {hyenaClanData.members.length == 1 ? "membro" : "membros"}
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
  name: {
    fontSize: 22,
    marginBottom: 5,
    fontFamily: fonts.subtitle,
  },
  userTag: {
    fontSize: 18,
    fontFamily: fonts.text,
  },
});

export default HyenaClanItem;
