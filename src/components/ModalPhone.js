import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput} from 'react-native';
import {Translator} from "../utils/js/main";
import {useSelector} from "react-redux";

export const ModalPhone = ({visibly, title, btnText, phone, result}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [number, onChangeNumber] = useState('');
    const state = useSelector(state => state.users);

    useEffect(() => {
        setModalVisible(visibly)
    }, [visibly])

    useEffect(() => {
        onChangeNumber(phone)
    }, [phone])

    const handleBackBtnClose = () => {
        setModalVisible(!modalVisible);
    }

    const mobileValidate = () => {
        const numLength = number.length;
        const reg = /^\d+$/;
        if (reg.test(number) === false || numLength !== 10) {
            Alert.alert(Translator(state.lang, "NotPhoneNumber"))
        } else {
            saveChange()
        }
    }

    const saveChange = () => {
        const res = {
            title,
            number
        }
        result(res)
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
                        onRequestClose={handleBackBtnClose}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.title}>{Translator(state.lang, title)}</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeNumber}
                                    value={number}
                                    placeholder={Translator(state.lang, "TypePhoneNumber")}
                                    keyboardType="phone-pad"
                                    dataDetectorTypes="phoneNumber"
                                    textContentType="telephoneNumber"
                                />
                                <View>
                                    <Pressable
                                        style={styles.button}
                                        onPress={mobileValidate}>
                                        <Text style={styles.textStyle}>{Translator(state.lang, btnText)}</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View> : null
            }
        </View>

    );
};

const styles = StyleSheet.create({
    centeredViewWrapper: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: "#c1c6c3a2",
        width: "100%",
        height: "100%",
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: "80%",
        height: 200,
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
    title: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        marginHorizontal: 15,
        marginBottom: 25,
        height: 40,
        borderColor: '#7a42f4',
        borderWidth: 1,
        padding: 10,
    },
});