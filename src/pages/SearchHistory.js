import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {setNavigate} from "../utils/actions/userAction";
import {AppSettingsContext} from "../AppSettingsContextProvider";
import {dateFormat} from "../utils/js/main";
import {getSearchUsersInfo} from "../utils/js/APIService";

export const SearchHistory = ({navigation}) => {
    const dispatch = useDispatch();

    const [searchItems, setSearchItems] = useState([]);

    const { appSettings } = useContext(AppSettingsContext)

    useEffect(() => {
        dispatch(setNavigate(""))
    }, [])

    useEffect(() => {
        const postData = []
        appSettings.SearchHistory.map(item => {
            const pd = {
                phone: item.phone
            }
            postData.push(pd)
        })
        getSearchUsersInfo({phones: postData}, res => {
            if (res) {
                setSearchItems(res)
            }
        })
    }, [appSettings])

    useEffect(() => {
        console.log("searchItems", searchItems)
    }, [searchItems])

    return (
        <View style={styles.container}>
            {
                appSettings.SearchHistory.map(item => {
                    return (
                        <View
                            key={item.phone}
                            style={styles.card}
                        >
                            <View style={styles.title}>
                                <Text>
                                    {item.phone}
                                </Text>
                                <Text>
                                    {dateFormat(item.date)}
                                </Text>
                            </View>
                        </View>
                    )
                })
            }

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
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
})