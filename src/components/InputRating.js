import {StyleSheet, View} from "react-native";
import {RadioButton, Text} from "react-native-paper";
import React, {useEffect, useState} from "react";
import {addRating, Translator} from "../utils/js/main";
import {useSelector} from "react-redux";

export const InputRating = ({type, subType = null, required = false, result}) => {
    const state = useSelector(state => state.users);
    const [checked, setChecked] = useState('');
    const [rating, setRating] = useState([]);

    useEffect(() => {
        setRating(addRating(type, subType))
    },[type, subType])

    useEffect(() => {
        result(checked);
    }, [checked])

    return (
        <View style={styles.container}>
            <Text style={styles.rateTitle}>{Translator(state.lang, "rate")}</Text>
            <RadioButton.Group onValueChange={newValue => setChecked(newValue)} value={checked}>
                {
                    rating.map(item => <View style={styles.radioBtnBlock} key={item.point}>
                        <RadioButton uncheckedColor={required ? "red" : ""} value={item.point} />
                        <Text style={styles.labelText}>{Translator(state.lang, item.label)}</Text>
                    </View>)
                }
            </RadioButton.Group>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    radioBtnBlock: {
        flexDirection: "row",
        alignItems: "center",
    },
    labelText: {
        fontSize: 13,
    },
    rateTitle: {
        fontSize: 20,
        textAlign: "center",
    }
})