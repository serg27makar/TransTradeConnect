import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import {Translator} from "../utils/js/main";
import {useDispatch, useSelector} from "react-redux";
import {patch, userType} from "../utils/const/const";
import {AddDispatcher} from "../components/AddDispatcher";
import {AddTrader} from "../components/AddTrader";
import {AddCarrier} from "../components/AddCarrier";
import { Entypo, MaterialIcons  } from '@expo/vector-icons';
import {ModalPhone} from "../components/ModalPhone";
import {clearPhones, editPhones, setAddPhone, setAddPhones} from "../utils/actions/userAction";

export const AddUser = ({navigation}) => {
    const state = useSelector(state => state.users);
    const dispatch = useDispatch();

    const [modalTitle, setModalTitle] = useState("");
    const [modalBtn, setModalBtn] = useState("");
    const [phoneIndex, setPhoneIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const [editedNumber, setEditedNumber] = useState("")

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: Translator(state.lang, userType.DISPATCHER), value: userType.DISPATCHER},
        {label: Translator(state.lang, userType.CARRIER), value: userType.CARRIER},
        {label: Translator(state.lang, userType.TRADER), value: userType.TRADER}
    ]);

    useEffect(() => {
        if (!state.addPhone) navigation.navigate(patch.HOME)
        setShowModal(false);
        if (state.editClient) fillClient();
    }, [])

    const fillClient = () => {
        setValue(state.editClient.type)
        dispatch(clearPhones())
        state.editClient.phones.map(item => {
            if (Number(item.phone) !== Number(state.addPhone))
                dispatch(setAddPhones(item.phone))
        })
    }

    const editPhone = (index = 0) => {
        setPhoneIndex(index)
        if (index) {
            setEditedNumber(state.addPhones[index - 1])
        } else {
            setEditedNumber(state.addPhone)
        }
        setModalTitle("editPhoneNumber");
        setModalBtn("edit");
        setShowModal(true);
    }

    const addPhone = () => {
        setEditedNumber("");
        setModalTitle("addPhoneNumber");
        setModalBtn("add");
        setShowModal(true);
    }

    const modalResult = (res) => {
        setShowModal(false)
        if (res.title === "addPhoneNumber") {
            dispatch(setAddPhones(res.number))
        } else {
            if (phoneIndex) {
                const data = {
                    index: phoneIndex - 1,
                    phone: res.number
                }
                dispatch(editPhones(data))
                setPhoneIndex(0)
            } else {
                dispatch(setAddPhone(res.number))
            }
        }
    }

    const checkIsAddedNumber = (number) => {
        return !state.editClient.phones.filter(i => i.phone === number)[0]
    }

    return (
        <View>
            <ModalPhone
                visibly={showModal}
                title={modalTitle}
                btnText={modalBtn}
                phone={editedNumber}
                phones={state.addPhones}
                result={modalResult}
            />
            <View style={styles.dropDown}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder={Translator(state.lang, "selectUserType")}
                />
            </View>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>{Translator(state.lang, "aboutWhomYouWantToShare")}</Text>
                <View style={styles.phoneBlock}>
                    <Text style={styles.headerPhone}>
                        {Translator(state.lang, "byNumber") + ": " + state.addPhone}
                    </Text>
                    {
                        !state.editClient || (state.editClient && !state.editClient._id) ?
                            <TouchableOpacity style={styles.imageBtn} onPress={() => editPhone()}>
                                <Entypo name="edit" size={24} color="white" />
                            </TouchableOpacity> : null
                    }

                    <TouchableOpacity style={styles.imageBtn} onPress={addPhone}>
                        <MaterialIcons name="add-call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                {
                    state.addPhones.length ? state.addPhones.map((item, index) => {
                        return (
                            <View style={styles.addedPhones} key={index}>
                                <Text style={styles.headerPhone}>
                                    {Translator(state.lang, "addedPhoneNumber") + ": " + item}
                                </Text>
                                {
                                    checkIsAddedNumber(item) ?
                                        <TouchableOpacity style={styles.imageBtn} onPress={() => editPhone(index + 1)}>
                                            <Entypo name="edit" size={24} color="white" />
                                        </TouchableOpacity> : null
                                }
                            </View>
                        )
                    }) : null
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
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginBottom: 30,
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
        margin: 15,
    },
    phoneBlock: {
        flexDirection: "row",
    },
    imageBtn: {
        padding: 10,
        borderColor: "#cacaca",
        borderWidth: 1,
        marginHorizontal: 5,
    },
    addedPhones: {
        flexDirection: "row",
        marginVertical: 10,
    }
})