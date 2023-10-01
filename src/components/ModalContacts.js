import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {Translator} from "../utils/js/main";
import {useSelector} from "react-redux";
import * as Contacts from "expo-contacts";
import DropDownPicker from "react-native-dropdown-picker";

export const ModalContacts = ({visibly, close}) => {
    const state = useSelector(state => state.users);

    const [modalVisible, setModalVisible] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [selectPhones, setSelectPhones] = useState([]);
    const [open, setOpen] = useState(false);
    const [yourContact, setYourContact] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [
                        Contacts.Fields.FirstName,
                        Contacts.Fields.PhoneNumbers,
                        Contacts.Fields.Name,
                    ],
                });

                if (data.length > 0) {
                    const contact = data.filter(i => !!i.phoneNumbers)
                    const contactsList = [];
                    contact.map((item, index) => {
                        const phones = item.phoneNumbers.map(phone => {
                            return clearPhones(phone.number)
                        })
                        const i = {
                            label: item.name + ": " + "\r\n" + getPhones(phones),
                            value: index,
                            phones: getPhones(phones),
                        }
                        contactsList.push(i)
                    })
                    setContacts(contactsList)
                }
            }
        })();
    }, []);

    useEffect(() => {
        setModalVisible(visibly)
    }, [visibly])

    useEffect(() => {
        if (yourContact !== null) parseContact(yourContact)
    }, [yourContact])

    const clearPhones = (phone) => {
        phone = phone.replaceAll("+38", "");
        phone = phone.replaceAll(" ", "");
        phone = phone.replaceAll("-", "");
        phone = phone.replaceAll("(", "");
        phone = phone.replaceAll(")", "");
        return phone;
    }

    const getPhones = (phones) => {
        let out = "";
        phones = [...new Set(phones)]
        phones.map(phone => {
            out = out + phone + "; "
        })
        return out;
    }

    const parseContact = (id) => {
        const contact = contacts.filter(i => i.value === id)[0];
        const phonesArr = contact.phones.split("; ")
        const output = [];
        phonesArr.map(item => {
            if (item) output.push(item)
        })
        setSelectPhones(output);
    }

    const searchPhone = (phone) => {
        close(phone)
        setModalVisible(!modalVisible);
    }

    const closeModal = () => {
        close()
        setModalVisible(!modalVisible);
    }

    return (
        <View>
            {
                modalVisible ?
                    <View style={styles.centeredViewWrapper}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={closeModal}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <View style={styles.dropDown}>
                                        <DropDownPicker
                                            listMode="MODAL"
                                            style={styles.input}
                                            open={open}
                                            value={yourContact}
                                            items={contacts}
                                            setOpen={setOpen}
                                            setValue={setYourContact}
                                            setItems={setContacts}
                                            placeholder={Translator(state.lang, "ChooseYourContact")}
                                        />
                                    </View>
                                    <View>
                                        {
                                            selectPhones.map((phone, index) => {
                                                return (
                                                    <Pressable
                                                        key ={index}
                                                        style={styles.phoneBtn}
                                                        onPress={() => searchPhone(phone)}>
                                                        <Text style={styles.textStyle}>{phone}</Text>
                                                    </Pressable>
                                                )
                                            })
                                        }
                                        <Pressable
                                            style={styles.button}
                                            onPress={closeModal}>
                                            <Text style={styles.textStyle}>{Translator(state.lang, "backBtn")}</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View> : null
            }
        </View>
    )
};

const styles = StyleSheet.create({
    centeredViewWrapper: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: "#c1c6c3a2",
        width: "100%",
        height: "150%",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: "80%",
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 1,
    },
    phoneBtn: {
        borderRadius: 20,
        padding: 5,
        marginBottom: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        marginBottom: 25,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        padding: 10,
        overflowY: "scroll",
        overflowX: "scroll",
    },
    dropDown: {
        zIndex: 10,
    },
})