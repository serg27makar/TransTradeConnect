import React from "react";
import {Text, View, StyleSheet, Button, TouchableOpacity} from "react-native";
import {LogOut, Translator} from "./utils/js/main";
import {useDispatch, useSelector} from "react-redux";
import {langs} from "./utils/const/const";
import {changeLang, setIsLogin} from "./utils/actions/userAction";
import Ionicons from "@expo/vector-icons/Ionicons";

export const Navbar = () => {
    const lang = useSelector((state) => state.users.lang);
    const dispatch = useDispatch();

    const changeLange = () => {
        const nextLang = lang === langs.UA ? langs.RU : langs.UA;
        dispatch(changeLang(nextLang))
    }

    const logOut = () => {
        dispatch(setIsLogin(false));
        LogOut()
    }

    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>{Translator(lang, "logo")}</Text>
            <Button style={styles.btn} title={lang} onPress={changeLange}/>
            <TouchableOpacity  onPress={logOut}>
                <Ionicons style={styles.exit} name='exit' size={32} color={"white"} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 80,
        alignItems: "flex-end",
        justifyContent: "center",
        backgroundColor: "#3949ab",
        paddingBottom: 10,
        flexDirection: "row",
    },
    text: {
        color: "white",
        fontSize: 20,
        marginRight: 20,
    },
    btn: {
        marginLeft: 20,
    },
    exit: {
        paddingLeft: 10,
    }
})