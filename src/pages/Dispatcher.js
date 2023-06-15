import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {setSearchData} from "../utils/actions/userAction";
import {useSelector} from "react-redux";

export const Dispatcher = ({navigation}) => {
    const state = useSelector(state => state.users);
    return (
        <View>
            <Text>Dispatcher</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})