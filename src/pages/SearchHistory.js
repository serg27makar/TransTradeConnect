import React, {useEffect} from "react";
import {Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {setNavigate} from "../utils/actions/userAction";

export const SearchHistory = ({navigation}) => {
    const state = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setNavigate(""))
    }, [])

    return (
        <View>
            <Text>
                History
            </Text>
        </View>
    )
}