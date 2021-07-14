import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { MemeCard } from '../components/MemeCard'

export function Feed() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Feed</Text>

            <MemeCard />
            <MemeCard />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        color: colors.background,
    },
    title: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.green,
    }
})
