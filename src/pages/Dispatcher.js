import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {useSelector} from "react-redux";
import {StarRating} from "../components/StarsRating";
import {Translator} from "../utils/js/main";

export const Dispatcher = ({navigation}) => {
    const state = useSelector(state => state.users);
    const whoAreLookingFor = state.whoAreLookingFor;
    const lang = state.lang;

    const [points, setPoints] = useState(0);
    const [rating, setRating] = useState(0);
    const [totalPeople, setTotalPeople] = useState(0);
    const [detailRating, setDetailRating] = useState([]);

    const totalResult = () => {
        let totalCount = 0;
        let count = 0;
        let iter = 0;
        for (let i in whoAreLookingFor.rating) {
            iter ++;
            totalCount = totalCount + Number(whoAreLookingFor.rating[i])
            count = count + (iter * Number(whoAreLookingFor.rating[i]))
        }
        return {count, totalCount}
    }

    const calculatePercent = (val) => {
        return (Math.round((Number(val) / totalPeople) * 10000) / 10000);
    }

    const detailedResult = () => {
        const ratings = [];
        let iter = 0;
        for (let i in whoAreLookingFor.rating) {
            iter ++;
            const item = {
                point: iter,
                rating: calculatePercent(whoAreLookingFor.rating[i]),
                label: "DispatcherRating" + iter,
                people: whoAreLookingFor.rating[i],
            }
            ratings.push(item)
        }
        setDetailRating(ratings)
    }

    useEffect(() => {
        const {count, totalCount} = totalResult();
        setTotalPeople(totalCount)
        setRating(Math.round((count / totalCount / 5) * 10000) / 10000);
        setPoints(Math.round(count / totalCount));
    }, [])

    useEffect(() => {
        if (totalPeople) detailedResult();
    }, [totalPeople])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{Translator(lang, "Dispatcher")}</Text>
            <View style={styles.person}>
                <Text style={styles.personTitle}>{whoAreLookingFor.phone}</Text>
                <Text style={styles.personTitle}>{whoAreLookingFor.name}</Text>
            </View>

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
    title: {
        textAlign: "center",
        fontSize: 25,
    },
    moreInfo: {
        padding: 15,
        fontSize: 16,
    },
    personTitle: {
        fontSize: 20,
    },
    person: {
        padding: 15,
    }
})