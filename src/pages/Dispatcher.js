import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useSelector} from "react-redux";
import {StarRating} from "../components/StarsRating";
import {detailedResult, totalResult, Translator} from "../utils/js/main";
import {Header} from "../components/Header";

export const Dispatcher = () => {
    const state = useSelector(state => state.users);
    const whoAreLookingFor = state.whoAreLookingFor;
    const lang = state.lang;

    const [points, setPoints] = useState(0);
    const [rating, setRating] = useState(0);
    const [totalPeople, setTotalPeople] = useState(0);
    const [detailRating, setDetailRating] = useState([]);

    useEffect(() => {
        const {count, totalCount} = totalResult(whoAreLookingFor.rating);
        setTotalPeople(totalCount)
        setRating(Math.round((count / totalCount / 5) * 10000) / 10000);
        setPoints(Math.round(count / totalCount));
    }, [])

    useEffect(() => {
        if (totalPeople) setDetailRating(detailedResult(whoAreLookingFor.rating, totalPeople));
    }, [totalPeople])

    return (
        <View style={styles.container}>
            <Header person={whoAreLookingFor}/>
            <StarRating point={points}
                        rating={rating}
                        label={Translator(lang, "TotalRating")}
                        people={totalPeople}
            />
            <View>
                <Text style={styles.moreInfo}>{Translator(lang, "MoreDetailedInformation")}</Text>
            </View>
            {
                detailRating.map(item => <StarRating point={item.point}
                                                     rating={item.rating}
                                                     label={Translator(lang, item.label)}
                                                     people={item.people}
                                                     key={item.point}
                />)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    moreInfo: {
        padding: 15,
        fontSize: 16,
    }
})