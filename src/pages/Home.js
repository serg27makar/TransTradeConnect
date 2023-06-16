import React, {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, TextInput, View, Alert} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {findByPhone, Translator} from "../utils/js/main";
import {setSearchData} from "../utils/actions/userAction";

export const Home = ({navigation}) => {
    const [number, onChangeNumber] = useState('');
    const state = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        if (state.whoAreLookingFor) {
            const patch = state.whoAreLookingFor.type
            navigation.navigate(patch === "carrier" ? "dispatcher" : patch)
        }
    }, [state.whoAreLookingFor])

    const mobileValidate = () => {
        dispatch(setSearchData(null))
        setTimeout(() => {
            const numLength = number.length;
            const reg = /^\d+$/;
            if (reg.test(number) === false || numLength !== 10) {
                Alert.alert(Translator(state.lang, "NotPhoneNumber"))
            } else {
                const res = findByPhone(number)
                if (res) {
                    dispatch(setSearchData(res))
                }
            }
        }, 100);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{Translator(state.lang, "EnterSearchNumber")}</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder={Translator(state.lang, "TypePhoneNumber")}
                keyboardType="phone-pad"
                dataDetectorTypes="phoneNumber"
                textContentType="telephoneNumber"
            />
            <Text style={styles.warning}>{Translator(state.lang, "EnterPhoneWithoutSpaces")}</Text>

            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {mobileValidate}>
                <Text style = {styles.submitButtonText}>{Translator(state.lang, "CheckOut")}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    btn: {
        fontSize: 20,
        padding: 10,
        borderStyle: "solid",
        borderWidth: 2,
    },
    input: {
        marginHorizontal: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        padding: 10,
    },
    label: {
        height: 40,
        marginLeft: 5,
        padding: 10,
    },
    warning: {
        height: 35,
        marginLeft: 5,
        padding: 10,
        fontSize: 10,
    },
    submitButton: {
        backgroundColor: '#7a42f4',
        padding: 10,
        margin: 15,
        height: 40,
    },
    submitButtonText:{
        color: 'white'
    }
})