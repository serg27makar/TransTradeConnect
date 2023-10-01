import React, {useContext, useEffect, useState} from 'react';
import {View, TextInput, Text, Button, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { Card } from 'react-native-elements';
import {generateMachineID, Translator} from "../utils/js/main";
import {useDispatch, useSelector} from "react-redux";
import {patch, userType} from "../utils/const/const";
import {postRegister} from "../utils/js/APIService";
import {setIsLogin, setUserId} from "../utils/actions/userAction";
import {AppSettingsContext} from "../AppSettingsContextProvider";
import DropDownPicker from "react-native-dropdown-picker";

export const RegistrationScreen = ({navigation}) => {
    const state = useSelector(state => state.users);
    const dispatch = useDispatch();

    const { setSettings } = useContext(AppSettingsContext)

    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [nameError, setNameError] = useState(false);

    const [open, setOpen] = useState(false);
    const [role, setRole] = useState(null);
    const [items, setItems] = useState([
        {label: Translator(state.lang, userType.DISPATCHER), value: userType.DISPATCHER},
        {label: Translator(state.lang, userType.CARRIER), value: userType.CARRIER},
        {label: Translator(state.lang, userType.TRADER), value: userType.TRADER},
        {label: Translator(state.lang, userType.INCOGNITO), value: userType.INCOGNITO}
    ]);

    useEffect(() => {
        setNameError(false);
    }, [userName, phoneNumber, password, role])


    const handleRegistration = () => {
        if (!userName || !phoneNumber || !password || !role) {
            setNameError(true);
            return;
        }
        const DeviceID = generateMachineID();
        const DateCreated = new Date();
        postRegister({
            Phone: phoneNumber,
            Password: password,
            UserName: userName,
            UserRole: role,
            UserType: "User",
            DeviceID,
            DateCreated,
        }, res => {
            if (res) {
                if (res && res.errMsg) {
                    Alert.alert(Translator(state.lang, res.errMsg))
                } else {
                    setSettings("UserID", res)
                    setSettings("UserName", userName)
                    setSettings("UserPhone", phoneNumber)
                    setSettings("DeviceID", DeviceID)
                    setSettings("UserRole", role)
                    setSettings("UserType", "User")
                    dispatch(setIsLogin(true));
                    dispatch(setUserId(res));
                }
            }
        })
    }

    const handleLogin = () => {
        navigation.navigate(patch.LOGIN)
    };

    return (
        <View style={styles.container}>
            <Card>
                <TextInput
                    placeholder={Translator(state.lang, "TypeYourName")}
                    value={userName}
                    onChangeText={setUserName}
                    style={[styles.input, nameError ? styles.errorInput : null]}
                />
                {(!!nameError && !userName) && (
                    <Text style={styles.errorMsg}>{Translator(state.lang, "fieldRequired")}</Text>
                )}
                <View style={styles.dropDown}>
                    <DropDownPicker
                        style={[styles.input, nameError ? styles.errorInput : null]}
                        open={open}
                        value={role}
                        items={items}
                        setOpen={setOpen}
                        setValue={setRole}
                        setItems={setItems}
                        placeholder={Translator(state.lang, "selectUserType")}
                    />
                </View>
                {(!!nameError && !role) && (
                    <Text style={styles.errorMsg}>{Translator(state.lang, "fieldRequired")}</Text>
                )}
                <TextInput
                    placeholder={Translator(state.lang, "TypePhoneNumber")}
                    value={phoneNumber}
                    keyboardType="phone-pad"
                    dataDetectorTypes="phoneNumber"
                    textContentType="telephoneNumber"
                    onChangeText={setPhoneNumber}
                    style={[styles.input, nameError ? styles.errorInput : null]}
                />
                {(!!nameError && !phoneNumber) && (
                    <Text style={styles.errorMsg}>{Translator(state.lang, "fieldRequired")}</Text>
                )}
                <TextInput
                    placeholder={Translator(state.lang, "Password")}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={[styles.input, nameError ? styles.errorInput : null]}
                />
                {(!!nameError && !password) && (
                    <Text style={styles.errorMsg}>{Translator(state.lang, "fieldRequired")}</Text>
                )}
                <Button title={Translator(state.lang, "Registration")} onPress={handleRegistration} />
                <TouchableOpacity style={styles.regWrapp} onPress={handleLogin}>
                    <Text style={styles.regText}>{Translator(state.lang, "Login")}</Text>
                </TouchableOpacity>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16
    },
    input: {
        padding: 5,
        fontSize: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#cacaca"
    },
    regText: {
        padding: 10
    },
    regWrapp: {
        alignItems: "center",
    },
    dropDown: {
        zIndex: 10,
    },
    errorMsg: {
        color: "red",
        paddingBottom: 20,
    },
})