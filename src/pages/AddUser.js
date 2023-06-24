import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import {Translator} from "../utils/js/main";
import {useSelector} from "react-redux";
import {patch, userType} from "../utils/const/const";
import {AddDispatcher} from "../components/AddDispatcher";
import {AddTrader} from "../components/AddTrader";
import {AddCarrier} from "../components/AddCarrier";

export const AddUser = ({navigation}) => {
    const state = useSelector(state => state.users);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: Translator(state.lang, userType.DISPATCHER), value: userType.DISPATCHER},
        {label: Translator(state.lang, userType.CARRIER), value: userType.CARRIER},
        {label: Translator(state.lang, userType.TRADER), value: userType.TRADER}
    ]);

    useEffect(() => {
        if (!state.addPhone) navigation.navigate(patch.HOME)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{Translator(state.lang, "aboutWhomYouWantToShare")}</Text>
            <Text style={styles.headerPhone}>{Translator(state.lang, "byNumber") + ": " + state.addPhone}</Text>

            {
                value ? null :
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder={Translator(state.lang, "selectUserType")}
                        style={styles.dropDown}
                    />
            }

            {
                value === userType.DISPATCHER ?
                    <AddDispatcher /> :
                value === userType.CARRIER ?
                    <AddCarrier /> :
                value === userType.TRADER ?
                    <AddTrader /> :
                    null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    header: {
        padding: 10,
        fontSize: 16,
    },
    headerPhone: {
        padding: 10,
        fontSize: 18,
        alignItems: "center"
    },
    dropDown: {
        zIndex: 10,
        marginBottom: 130,
    }
})