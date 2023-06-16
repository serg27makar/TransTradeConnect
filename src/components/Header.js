import {StyleSheet, Text, View} from "react-native";
import {Translator} from "../utils/js/main";
import React from "react";
import {useSelector} from "react-redux";

export const Header = ({person, navigation}) => {
    const state = useSelector(state => state.users);

    return (
        <View>
            <Text style={styles.title}>{Translator(state.lang, person.type)}</Text>
            <View style={styles.person}>
                <Text style={styles.personTitle}>{person.phone}</Text>
                <Text style={styles.personTitle}>{person.name}</Text>
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