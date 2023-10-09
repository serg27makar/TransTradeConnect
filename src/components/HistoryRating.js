import React, {useEffect, useState} from "react";
import {totalResult, traderTotalResult} from "../utils/js/main";
import {StarRating} from "./StarsRating";
import {View} from "react-native";

export const HistoryRating = ({ratingData}) => {
    const [points, setPoints] = useState(0);
    const [rating, setRating] = useState(0);

    const [totalPeople, setTotalPeople] = useState(0);

    useEffect(() => {
        if (ratingData.Calculation && ratingData.InformativenessUnloading && ratingData.Downtime) {
            const {count, totalCount} = traderTotalResult(ratingData.Calculation, ratingData.InformativenessUnloading, ratingData.Downtime);
            setTotalPeople(Math.round(totalCount / 3))
            setRating(Math.round(((count / totalCount) / 5) * 10000) / 10000);
            setPoints(Math.round(count / totalCount));
        } else if (ratingData.rating) {
            const {count, totalCount} = totalResult(ratingData.rating);
            setTotalPeople(totalCount)
            setRating(Math.round((count / totalCount / 5) * 10000) / 10000);
            setPoints(Math.round(count / totalCount));
        }
    }, [])

    return (
        <View>
            <StarRating point={points}
                        rating={rating}
                        people={totalPeople}
            />
        </View>
    )
}