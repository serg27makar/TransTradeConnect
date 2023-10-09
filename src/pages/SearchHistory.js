import React, {useContext, useEffect, useState} from "react";
import {Button, ScrollView, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {clearPhones, setAddPhone, setEditClient, setNavigate} from "../utils/actions/userAction";
import {AppSettingsContext} from "../AppSettingsContextProvider";
import {dateFormat, Translator} from "../utils/js/main";
import {getSearchUsersInfo, getUserInfo, removeItemOnHistory} from "../utils/js/APIService";
import {HistoryRating} from "../components/HistoryRating";

export const SearchHistory = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.users);

    const [searchItems, setSearchItems] = useState([]);

    const { appSettings, setSettings } = useContext(AppSettingsContext)

    useEffect(() => {
        dispatch(setNavigate(""))
    }, [])

    useEffect(() => {
        setSearchItems([])
        if (appSettings.SearchHistory && appSettings.SearchHistory.length) {
            const postData = []
            appSettings.SearchHistory.map(item => {
                const pd = { phone: item.phone }
                postData.push(pd)
            })
            getSearchUsersInfo({phones: postData}, res => {
                if (res) allMatches(res)
            })
        }
    }, [appSettings])

    const allMatches = (data) => {
        let matches = []
        appSettings.SearchHistory.map((item, index) => {
            let obj = {
                index,
                phone: item.phone,
                date: item.date,
            }
            data.map(resData => {
                let isMatch = false;
                resData.phones.map(p => {
                    if (!isMatch) isMatch = p.phone === item.phone
                })
                if (isMatch) obj = {...resData, ...obj}
            })
            matches.push(obj)
        })
        matches = matches.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)).reverse()
        setSearchItems(matches)
    }

    const addRating = (item) => {
        getUserInfo({Phone: item.phone}, res => {
            dispatch(clearPhones())
            if (res) {
                dispatch(setEditClient(res))
            } else {
                dispatch(setEditClient(null))
            }
            dispatch(setAddPhone(item.phone))
        })
    }

    const removeOnHistory = (item) => {
        const postData = {
            phone: item.phone,
            UserID: appSettings.UserID,
        }
        const newSearchHistory = appSettings.SearchHistory.filter(i => i.phone !== item.phone);
        removeItemOnHistory(postData, result => {
            if (result) setSettings("SearchHistory", newSearchHistory)
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {
                    searchItems && searchItems.map(item => {
                        return (
                            <View
                                key={item.index}
                                style={styles.card}
                            >
                                {
                                    item.name ?
                                        <View style={styles.title}>
                                            <Text>
                                                {item.name}
                                            </Text>
                                            <Text>
                                                {Translator(state.lang, item.type)}
                                            </Text>
                                        </View> : null
                                }

                                <View style={styles.title}>
                                    <Text>
                                        {item.phone}
                                    </Text>
                                    <Text>
                                        {dateFormat(item.date)}
                                    </Text>
                                </View>
                                {
                                    item.phones && item.phones.map(i => {
                                        if (i.phone !== item.phone)
                                        return (
                                            <View key={i.phone}>
                                                <Text>{i.phone}</Text>
                                            </View>
                                        )
                                    })
                                }
                                <HistoryRating ratingData={item}/>
                                <View style={styles.btnWrapper}>
                                    <Button onPress={() => addRating(item)} title={Translator(state.lang, "ToAddRating")}/>
                                    <Button onPress={() => removeOnHistory(item)} title={Translator(state.lang, "RemoveOnHistory")}/>
                                </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    card: {
        borderColor: "#cacaca",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    phone: {
        flexDirection:'row',
        flexWrap:'wrap'
    },
    scrollView: {
        marginBottom: 20,
    },
    btnWrapper: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})