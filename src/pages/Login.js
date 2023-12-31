import React, {useContext, useEffect} from 'react';
import {View, TextInput, Text, Button, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import { Card } from 'react-native-elements';
import {Translator} from "../utils/js/main";
import {useDispatch, useSelector} from "react-redux";
import {patch} from "../utils/const/const";
import {postLogin} from "../utils/js/APIService";
import {setIsLogin, setUserId} from "../utils/actions/userAction";
import {AppSettingsContext} from "../AppSettingsContextProvider";

export const LoginScreen = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const state = useSelector(state => state.users);
    const dispatch = useDispatch();

    const { appSettingsInitialized, appSettings, setSettings } = useContext(AppSettingsContext)

    useEffect(() => {
        if (appSettingsInitialized) {
            dispatch(setIsLogin(appSettings.UserID && appSettings.UserID.length > 10));
        }
    }, [appSettings])

    const handleLogin = () => {
        postLogin({
            Phone: phoneNumber,
            Password: password
        }, res => {
            if (res && res.errMsg) {
                Alert.alert(Translator(state.lang, res.errMsg))
            } else if (res && res.UserID) {
                setSettings("UserID", res.UserID)
                setSettings("UserName", res.UserName)
                setSettings("UserPhone", res.Phone)
                setSettings("UserRole", res.UserRole)
                setSettings("UserType", res.UserType)
                setSettings("SearchHistory", res.SearchHistory)
                dispatch(setUserId(res));
            }
        })
    };

    const handleRegistration = () => {
        navigation.navigate(patch.REGISTRATION)
    }

    return (
        <View style={styles.container}>
            <Card>
                <TextInput
                    placeholder={Translator(state.lang, "TypePhoneNumber")}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    style={styles.input}
                    keyboardType="phone-pad"
                    dataDetectorTypes="phoneNumber"
                    textContentType="telephoneNumber"
                />
                <TextInput
                    placeholder={Translator(state.lang, "Password")}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />
                <Button title={Translator(state.lang, "Login")} onPress={handleLogin} />
                <TouchableOpacity style={styles.regWrapp} onPress={handleRegistration}>
                    <Text style={styles.regText}>{Translator(state.lang, "Registration")}</Text>
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
    }
})