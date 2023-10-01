import React, {useContext, useEffect} from "react";
import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import {Translator} from "./utils/js/main";
import {useDispatch, useSelector} from "react-redux";
import {patch} from "./utils/const/const";
import {setIsLogin, setNavigate} from "./utils/actions/userAction";
import {FontAwesome5} from "@expo/vector-icons";
import {AppSettingsContext} from "./AppSettingsContextProvider";

export const Navbar = () => {
    const state = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const { appSettings } = useContext(AppSettingsContext);

    useEffect(() => {
        dispatch(setIsLogin(appSettings.UserID && appSettings.UserID.length > 10));
    }, [appSettings])

    const openProfile = () => {
        dispatch(setNavigate(patch.PROFILE))
    }

    return (
        <View style={styles.navbar}>
            {
                state.isLogin ? (
                    <TouchableOpacity  onPress={openProfile}>
                        <FontAwesome5 name="home" size={24} color="white" />
                    </TouchableOpacity>
                ) : null
            }
            <Text style={[styles.text, !state.isLogin ? styles.textFull : styles.textLowe]}>{Translator(state.lang, "logo")}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 80,
        width: "100%",
        alignItems: "flex-end",
        backgroundColor: "#3949ab",
        paddingBottom: 10,
        paddingLeft: 20,
        flexDirection: "row",
    },
    text: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
    },
    textFull: {
        width: "100%"
    },
    textLowe: {
        width: "80%",
    }
})