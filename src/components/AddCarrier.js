import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {Translator} from "../utils/js/main";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {userType} from "../utils/const/const";
import {InputRating} from "./InputRating";
import useDataUser from "../hooks/saveDataUser";

export const AddCarrier = () => {
    const state = useSelector(state => state.users);
    const saveDataUser = useDataUser()

    const [userName, setUserName] = useState("");
    const [nameError, setNameError] = useState(false);
    const [pointError, setPointError] = useState(false);
    const [pointResult, setPointResult] = useState(0);
    const [isReadOnly, setIsReadOnly] = useState(false);

    useEffect(() => {
        setNameError(false);
        setPointError(false);
    }, [pointResult, userName])

    useEffect(() => {
        if (state.editClient) {
            setIsReadOnly(true)
            setUserName(state.editClient.name)
        } else {
            setIsReadOnly(false)
        }
    },[])

    const dataSave = () => {
        setNameError(!userName)
        setPointError(!pointResult)
        if (!userName || !pointResult) return;
        let User = {
            type: userType.CARRIER,
            phone: state.addPhone,
            name: userName,
            ratingPoint: pointResult,
            investigatorId: state.userID,
            date: new Date(),
            additionalNumbers: state.addPhones
        }
        saveDataUser(User)
    }

    return (
        <View>
            <Text style={styles.title}>{Translator(state.lang, userType.CARRIER)}</Text>
            <View style={styles.person}>
                <TextInput
                    editable={!isReadOnly}
                    style={[styles.input, nameError ? styles.errorInput : null]}
                    onChangeText={setUserName}
                    value={userName}
                    placeholder={Translator(state.lang, "enterNameOrganization")}
                />
                {!!nameError && (
                    <Text style={styles.errorMsg}>{Translator(state.lang, "fieldRequired")}</Text>
                )}
                <InputRating type={userType.CARRIER} result={setPointResult} required={pointError}/>
                {!!pointError && (
                    <Text style={styles.errorMsg}>{Translator(state.lang, "ratingRequired")}</Text>
                )}
            </View>
            <View style={styles.btnWrapper}>
                <Button onPress={dataSave} title={Translator(state.lang, "save")} />
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
    input: {
        marginHorizontal: 15,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        padding: 10,
    },
    errorMsg: {
        color: "red",
        paddingLeft: 20,
    },
    errorInput: {
        borderColor: "red",
    },
    btnWrapper: {
        paddingHorizontal: 50,
    }
})