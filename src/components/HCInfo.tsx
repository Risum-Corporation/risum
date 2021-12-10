import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import colors from "../styles/colors";

import fonts from "../styles/fonts";

interface HCProps {
  theme: boolean;
  cover: any;
  hyenaShield: any;
  members: number;
  adms: number;
  memeRank?: number;
  isMember: boolean;
  whenFollow: any;
  whenUnfollow: any;
}

export function HCInfo({
  theme,
  cover,
  hyenaShield,
  members,
  adms,
  memeRank,
  isMember,
  whenFollow,
  whenUnfollow,
}: HCProps) {
  return (
    <>
      <View style={styles.wallpaperContainer}>
        <Image
          source={cover ? { uri: cover } : require("../assets/wpWallpaper.jpg")}
          style={styles.wallpaper}
        />
      </View>

      <View style={styles.membershipButtonContainer}>
        {isMember ? (
          <TouchableOpacity
            onPress={whenUnfollow}
            style={[
              styles.membershipButton,
              {
                backgroundColor: theme ? colors.purpleLight : colors.purple,
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                { color: theme ? colors.whiteLight : colors.white },
              ]}
            >
              Sair da Alcateia
            </Text>
          </TouchableOpacity>
        ) : (
          // Exibe o botão de SEGUIR caso o usuário seja diferente do local
          <TouchableOpacity
            onPress={whenFollow}
            style={[
              styles.membershipButton,
              {
                backgroundColor: theme ? colors.greenLight : colors.green,
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                { color: theme ? colors.whiteLight : colors.white },
              ]}
            >
              Seguir
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.headerContainer}>
        <Image
          source={
            hyenaShield
              ? { uri: hyenaShield }
              : require("../assets/risumDefault.png")
          }
          style={styles.wpIcon}
        />
        <View style={styles.info}>
          <View>
            <View style={styles.lineText}>
              <Text
                style={
                  theme
                    ? [styles.text, { color: colors.greenLight }]
                    : [styles.text, { color: colors.green }]
                }
              >
                {members}
              </Text>
              <Text
                style={
                  theme
                    ? [styles.text, { color: colors.whiteLight }]
                    : [styles.text, { color: colors.white }]
                }
              >
                Membros
              </Text>
            </View>

            <View style={styles.lineText}>
              <Text
                style={
                  theme
                    ? [styles.text, { color: colors.greenLight }]
                    : [styles.text, { color: colors.green }]
                }
              >
                {adms}
              </Text>
              <Text
                style={
                  theme
                    ? [styles.text, { color: colors.whiteLight }]
                    : [styles.text, { color: colors.white }]
                }
              >
                Adms
              </Text>
            </View>
          </View>
          <View style={styles.lineText}>
            <Text
              style={
                theme
                  ? [styles.text, { color: colors.greenLight }]
                  : [styles.text, { color: colors.green }]
              }
            >
              {memeRank}º
            </Text>
            <Text
              style={
                theme
                  ? [styles.text, { color: colors.whiteLight }]
                  : [styles.text, { color: colors.white }]
              }
            >
              no MemeRank
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    marginHorizontal: 35,
  },
  wallpaper: {
    resizeMode: "cover", // IMPORTANTE! NÃO REMOVER
    height: 160,
    width: "100%",
    borderRadius: 10,
  },
  wallpaperContainer: {
    marginHorizontal: 10,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "115%",
    marginBottom: 40,
    marginTop: 10,
  },
  wpIcon: {
    width: 100,
    height: 100,
    marginTop: -35,
    borderRadius: 20,
    borderColor: colors.background,
    alignItems: "center",
    position: "absolute",
  },
  text: {
    marginHorizontal: 2.5,
    fontWeight: "bold",
  },
  lineText: {
    marginHorizontal: 5,
    flexDirection: "row",
  },
  membershipButtonContainer: {
    alignSelf: "flex-end",
    position: "absolute",
    top: 120,
    right: 1,
  },
  membershipButton: {
    backgroundColor: colors.purple,
    padding: 10,
    borderTopLeftRadius: 8,
  },
});
