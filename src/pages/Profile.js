import React, {useContext, useEffect} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {changeLang, setNavigate, toggleMenu} from "../utils/actions/userAction";
import {Translator} from "../utils/js/main";
import {AppSettingsContext} from "../AppSettingsContextProvider";
import {Ionicons, FontAwesome, MaterialIcons} from "@expo/vector-icons";
import {langs, patch} from "../utils/const/const";

export const Profile = () => {
    const state = useSelector(state => state.users);
    const dispatch = useDispatch();

    const { appSettings, logOutAsync } = useContext(AppSettingsContext)

    useEffect(() => {
        dispatch(setNavigate(""))
    }, [])

    const goToNewSearch = () => {
        dispatch(toggleMenu(false))
        dispatch(setNavigate(patch.HOME))
    }

    const goToHistory = () => {
        dispatch(toggleMenu(false))
        dispatch(setNavigate(patch.HISTORY))
    }

    const changeLange = () => {
        const nextLang = state.lang === langs.UA ? langs.RU : langs.UA;
        dispatch(changeLang(nextLang))
    }

    const logOut = () => {
        logOutAsync();
    }

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Text style={styles.profileText}>{appSettings.UserName}</Text>
                <Text style={styles.profileText}>{appSettings.UserPhone}</Text>
                <Text style={styles.profileText}>{ Translator(state.lang, appSettings.UserRole)}</Text>
            </View>
            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {goToNewSearch}>
                <MaterialIcons style={styles.btnIcon} name="person-search" size={24}/>
                <Text style = {styles.submitButtonText}>{Translator(state.lang, "newSearch")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {goToHistory}>
                <FontAwesome style={styles.btnIcon} name="history" size={24}/>
                <Text style = {styles.submitButtonText}>{Translator(state.lang, "history")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {changeLange}>
                <FontAwesome style={styles.btnIcon} name="language" size={24}/>
                <Text style = {styles.submitButtonText}>{Translator(state.lang, "language")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = {styles.submitButton}
                onPress = {logOut}>
                <Ionicons style={styles.btnIcon} name='exit' size={24}/>
                <Text style = {styles.submitButtonText}>{Translator(state.lang, "exit")}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    profileContainer: {
        borderColor: '#adadad',
        borderBottomWidth: 2,
        paddingBottom: 5,
    },
    profileText: {
        fontSize: 20
    },
    submitButton: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    btnIcon: {
        marginRight: 20
    }
})