import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Feed() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feed</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.green,
    }
})
