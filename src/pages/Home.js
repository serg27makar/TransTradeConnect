import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

export const Home = ({navigation}) => {
    const state = useSelector(state => state.users);
    const dispatch = useDispatch()
    return (
        <View>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("dispatcher")}>
                <Text>Dispatcher</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("carrier")}>
                <Text>Carrier</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("trader")}>
                <Text>Trader</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        fontSize: 20,
        padding: 10,
        borderStyle: "solid",
        borderWidth: 2,
    }
})