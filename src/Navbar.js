import React, {useEffect} from "react";
import {Text, View, StyleSheet, Button} from "react-native";
import {Langs} from "./utils/js/main";
import {useDispatch, useSelector} from "react-redux";
import {langs} from "./utils/const/const";
import {changeLang} from "./utils/actions/userAction";

export const Navbar = () => {
    const lang = useSelector((state) => state.users.lang);
    const dispatch = useDispatch();

    const changeLange = () => {
        const nextLang = lang === langs.UA ? langs.RU : langs.UA;
        dispatch(changeLang(nextLang))
    }

    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>{Langs("logo")}</Text>
            <Button style={styles.btn} title={lang} onPress={changeLange}/>
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
    }
})