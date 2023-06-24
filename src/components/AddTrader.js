import {StyleSheet, Text, View} from "react-native";
import {Translator} from "../utils/js/main";
import React from "react";
import {useSelector} from "react-redux";
import {userType} from "../utils/const/const";

export const AddTrader = ({navigation}) => {
    const state = useSelector(state => state.users);

    return (
        <View>
            <Text style={styles.title}>{Translator(state.lang, userType.TRADER)}</Text>
            <View style={styles.person}>
                <Text>TRADER</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        fontSize: 25,
    },
    person: {
        padding: 15,
    },
    personTitle: {
        fontSize: 20,
    },
})