import {Alert, Button, StyleSheet, Text, TextInput, View} from "react-native";
import {Translator} from "../utils/js/main";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {userType} from "../utils/const/const";
import {InputRating} from "./InputRating";
import {addUserInfo, editUserInfo} from "../utils/js/APIService";

export const AddTrader = () => {
    const state = useSelector(state => state.users);

    const [userName, setUserName] = useState("");
    const [nameError, setNameError] = useState(false);

    const [pointError, setPointError] = useState(false);
    const [calcPointResult, setCalcPointResult] = useState(0);
    const [infoPointResult, setInfoPointResult] = useState(0);
    const [downtimePointResult, setDowntimePointResult] = useState(0);

    useEffect(() => {
        setNameError(false);
        setPointError(false);
    }, [calcPointResult, infoPointResult, downtimePointResult, userName])

    useEffect(() => {
        if (state.editClient) setUserName(state.editClient.name);
    },[])

    const dataSave = () => {
        setNameError(!userName)
        setPointError((!calcPointResult && !infoPointResult && !downtimePointResult))
        if (!userName || (!calcPointResult && !infoPointResult && !downtimePointResult)) return;
        let User = {
            type: userType.TRADER,
            phone: state.addPhone,
            name: userName,
            calcRatingPoint: calcPointResult,
            infoRatingPoint: infoPointResult,
            downtimeRatingPoint: downtimePointResult,
            investigatorId: state.userID,
            date: new Date(),
            additionalNumbers: state.addPhones
        }
        if (state.editClient) {
            User = {...User, id: state.editClient._id}
            editUserInfo(User, res => {
                if (res) {
                    Alert.alert(Translator(state.lang, "successfullyAdded"))
                } else {
                    Alert.alert(Translator(state.lang, "somethingWentWrong"))
                }
            })
        } else {
            addUserInfo(User, res => {
                if (res) {
                    Alert.alert(Translator(state.lang, "successfullyAdded"))
                } else {
                    Alert.alert(Translator(state.lang, "somethingWentWrong"))
                }
            })
        }
    }

    return (
        <View style={styles.scrollView}>
            <Text style={styles.title}>{Translator(state.lang, userType.TRADER)}</Text>
            <View style={styles.person}>
                <TextInput
                    style={[styles.input, nameError ? styles.errorInput : null]}
                    onChangeText={setUserName}
                    value={userName}
                    placeholder={Translator(state.lang, "enterNameOrganization")}
                />
                {!!nameError && (
                    <Text style={styles.errorMsg}>{Translator(state.lang, "fieldRequired")}</Text>
                )}
                <InputRating
                    type={userType.TRADER}
                    subType={"calc"}
                    result={setCalcPointResult}
                    required={pointError}
                    title={"Calculation"}
                />
                {!!pointError && (
                    <Text style={styles.errorMsg}>{Translator(state.lang, "ratingRequired")}</Text>
                )}
                <InputRating
                    type={userType.TRADER}
                    subType={"info"}
                    result={setInfoPointResult}
                    required={pointError}
                    title={"InformativenessUnloading"}
                />
                {!!pointError && (
                    <Text style={styles.errorMsg}>{Translator(state.lang, "ratingRequired")}</Text>
                )}
                <InputRating
                    type={userType.TRADER}
                    subType={"down"}
                    result={setDowntimePointResult}
                    required={pointError}
                    title={"Downtime"}
                />
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
        marginBottom: 20,
    },
    scrollView: {
        marginBottom: 70,
    }
})