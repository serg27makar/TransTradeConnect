import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {TouchableOpacity} from "react-native";

export const ScreenSecond = ({}) => {
    return (
        <TouchableOpacity>
            <View style={styles.todo}>
                <Text style={styles.title}>Screen too text</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 5,
        marginBottom: 10,
    },
    title: {}
})