import React, {useContext, useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {setNavigate} from "../utils/actions/userAction";
import {AppSettingsContext} from "../AppSettingsContextProvider";
import {dateFormat, Translator} from "../utils/js/main";
import {getSearchUsersInfo} from "../utils/js/APIService";
import {StarRating} from "../components/StarsRating";

export const SearchHistory = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state.users);

    const [searchItems, setSearchItems] = useState([]);

    const { appSettings } = useContext(AppSettingsContext)

    useEffect(() => {
        dispatch(setNavigate(""))
    }, [])

    useEffect(() => {
        const postData = []
        appSettings.SearchHistory.map(item => {
            const pd = { phone: item.phone }
            postData.push(pd)
        })
        getSearchUsersInfo({phones: postData}, res => {
            if (res) allMatches(res)
        })
    }, [appSettings])

    const allMatches = (data) => {
        const matches = []
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
                if (isMatch) obj = {...obj, ...resData}
            })
            matches.push(obj)
        })
        console.log(matches)
        setSearchItems(matches)
    }

    return (
        <View style={styles.container}>
            {
                searchItems.map(item => {
                    return (
                        <View
                            key={item.index}
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
                            <View style={styles.title}>
                                <Text>
                                    {item.name}
                                </Text>
                                <Text>
                                    {Translator(state.lang, item.type)}
                                </Text>
                            </View>
                            {/*{*/}
                            {/*    item._id ?*/}
                            {/*        <StarRating point={points}*/}
                            {/*                    rating={rating}*/}
                            {/*                    label={Translator(state.lang, "TotalRating")}*/}
                            {/*                    people={totalPeople}*/}
                            {/*        /> : null*/}
                            {/*}*/}
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
    phone: {
        flexDirection:'row',
        flexWrap:'wrap'
    }
})