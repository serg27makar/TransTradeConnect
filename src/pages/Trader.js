import React, {useEffect, useState} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Header} from "../components/Header";
import {useSelector} from "react-redux";
import {StarRating} from "../components/StarsRating";
import {detailedResult, totalResult, traderTotalResult, Translator} from "../utils/js/main";
import { AntDesign } from '@expo/vector-icons';

export const Trader = () => {
    const state = useSelector(state => state.users);
    const whoAreLookingFor = state.whoAreLookingFor;
    const lang = state.lang;

    const [extendCalc, setExtendCalc] = useState(false);
    const [extendInfo, setExtendInfo] = useState(false);
    const [extendDown, setExtendDown] = useState(false);

    const [points, setPoints] = useState(0);
    const [rating, setRating] = useState(0);

    const [pointsCalc, setPointsCalc] = useState(0);
    const [ratingCalc, setRatingCalc] = useState(0);

    const [pointsInfo, setPointsInfo] = useState(0);
    const [ratingInfo, setRatingInfo] = useState(0);

    const [pointsDown, setPointsDown] = useState(0);
    const [ratingDown, setRatingDown] = useState(0);

    const [totalPeople, setTotalPeople] = useState(0);
    const [totalCalcPeople, setTotalCalcPeople] = useState(0);
    const [totalInfoPeople, setTotalInfoPeople] = useState(0);
    const [totalDownPeople, setTotalDownPeople] = useState(0);

    const [calcDetailRating, setCalcDetailRating] = useState([]);
    const [infoDetailRating, setInfoDetailRating] = useState([]);
    const [downDetailRating, setDownDetailRating] = useState([]);

    useEffect(() => {
        const {count, totalCount} = traderTotalResult(whoAreLookingFor.Calculation, whoAreLookingFor.InformativenessUnloading, whoAreLookingFor.Downtime);
        const calc = totalResult(whoAreLookingFor.Calculation);
        const info = totalResult(whoAreLookingFor.InformativenessUnloading);
        const down = totalResult(whoAreLookingFor.Downtime);
        setTotalPeople(totalCount)
        setTotalCalcPeople(calc.totalCount)
        setTotalInfoPeople(info.totalCount)
        setTotalDownPeople(down.totalCount)
        setRating(Math.round((count / totalCount / 5) * 10000) / 10000);
        setRatingCalc(Math.round((calc.count / calc.totalCount / 5) * 10000) / 10000);
        setRatingInfo(Math.round((info.count / info.totalCount / 5) * 10000) / 10000);
        setRatingDown(Math.round((down.count / down.totalCount / 5) * 10000) / 10000);
        setPoints(Math.round(count / totalCount));
        setPointsCalc(Math.round(calc.count / calc.totalCount));
        setPointsInfo(Math.round(info.count / info.totalCount));
        setPointsDown(Math.round(down.count / down.totalCount));
    }, [])

    useEffect(() => {
        if (totalCalcPeople && totalInfoPeople && totalDownPeople && whoAreLookingFor) {
            setCalcDetailRating(detailedResult(whoAreLookingFor.Calculation, totalCalcPeople, whoAreLookingFor.type, "calc"));
            setInfoDetailRating(detailedResult(whoAreLookingFor.InformativenessUnloading, totalInfoPeople, whoAreLookingFor.type, "info"));
            setDownDetailRating(detailedResult(whoAreLookingFor.Downtime, totalDownPeople, whoAreLookingFor.type, "down"));
        }
    }, [totalCalcPeople, totalInfoPeople, totalDownPeople, whoAreLookingFor])

    return (
        <View>
            <Header person={whoAreLookingFor}/>
            <StarRating point={points}
                        rating={rating}
                        label={Translator(lang, "TotalRating")}
                        people={totalPeople}
            />
            <ScrollView style={styles.scrollView}>
                <Text style={styles.moreInfo}>{Translator(lang, "MoreDetailedInformation")}</Text>
                <TouchableOpacity onPress={() => setExtendCalc(!extendCalc)}>
                    <View  style={styles.arrow}>
                        <AntDesign name={extendCalc ? "upcircleo" : "downcircleo"} size={24} color="black" />
                        <StarRating point={pointsCalc}
                                    rating={ratingCalc}
                                    label={Translator(lang, "Calculation")}
                                    people={totalCalcPeople}
                        />
                    </View>

                </TouchableOpacity>
                {
                    extendCalc ?
                    <View style={styles.content}>
                        {
                            calcDetailRating.map(item => <StarRating point={item.point}
                                                                     rating={item.rating}
                                                                     label={Translator(lang, item.label)}
                                                                     people={item.people}
                                                                     key={item.point}
                            />)
                        }
                    </View> : null
                }
                <TouchableOpacity onPress={() => setExtendInfo(!extendInfo)}>
                    <View  style={styles.arrow}>
                        <AntDesign name={extendInfo ? "upcircleo" : "downcircleo"} size={24} color="black" />
                        <StarRating point={pointsInfo}
                                    rating={ratingInfo}
                                    label={Translator(lang, "InformativenessUnloading")}
                                    people={totalInfoPeople}
                        />
                    </View>
                </TouchableOpacity>
                {
                    extendInfo ?
                        <View style={styles.content}>
                            {
                                infoDetailRating.map(item => <StarRating point={item.point}
                                                                         rating={item.rating}
                                                                         label={Translator(lang, item.label)}
                                                                         people={item.people}
                                                                         key={item.point}
                                />)
                            }
                        </View> : null

                }
                <TouchableOpacity onPress={() => setExtendDown(!extendDown)}>
                    <View  style={styles.arrow}>
                        <AntDesign name={extendDown ? "upcircleo" : "downcircleo"} size={24} color="black" />
                        <StarRating point={pointsDown}
                                    rating={ratingDown}
                                    label={Translator(lang, "Downtime")}
                                    people={totalDownPeople}
                        />
                    </View>
                </TouchableOpacity>
                {
                    extendDown ?
                        <View style={styles.content}>
                            {
                                downDetailRating.map(item => <StarRating point={item.point}
                                                                         rating={item.rating}
                                                                         label={Translator(lang, item.label)}
                                                                         people={item.people}
                                                                         key={item.point}
                                />)
                            }
                        </View> : null
                }

            </ScrollView>

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
    },
    scrollView: {
        marginBottom: 200,
        padding: 5,
    },
    content: {
        paddingLeft: 20,
        borderWidth: 1,
        marginHorizontal: 20
    },
    arrow: {
        flexDirection: "row",
    }
})