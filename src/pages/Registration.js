import React from 'react';
import {View, TextInput, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import { Card } from 'react-native-elements';
import {Translator} from "../utils/js/main";
import {useDispatch, useSelector} from "react-redux";
import {patch} from "../utils/const/const";
import {postRegister} from "../utils/js/APIService";
import {setIsLogin, setUserId} from "../utils/actions/userAction";

export const RegistrationScreen = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [password, setPassword] = React.useState('');
    const state = useSelector(state => state.users);
    const dispatch = useDispatch();

    const handleRegistration = () => {
        postRegister({
            Phone: phoneNumber,
            Password: password
        }, res => {
            if (res) {
                navigation.navigate(patch.HOME)
                dispatch(setIsLogin(true));
                dispatch(setUserId(res));
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
                    placeholder={Translator(state.lang, "TypePhoneNumber")}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    style={styles.input}
                />
                <TextInput
                    placeholder={Translator(state.lang, "Password")}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                />
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
    }
})