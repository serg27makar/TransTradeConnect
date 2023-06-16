import React, {useEffect, useState} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import {View, StyleSheet, Text} from 'react-native';
import {Star} from "./Star";
import * as Progress from 'react-native-progress';

export const StarRating = ({point, rating, label, people = 0}) => {
    const [pointState, setPointState] = useState([])
    const points = () => {
        let likes = [];
        for (let i = 1; i <= 5; i++) {
            const isStar = point >= i
            likes.push(isStar)
        }
        setPointState(likes)
    }

    const adaptTerm = (val) => {
        const rat = val * 100;
        let res = "";
        if (rat < 10) res = rat.toString().substr(0, 4)
        else res = rat.toString().substr(0, 5)
        return res
    }

    useEffect(() => {
        points();
    }, [point])

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.block}>
                {pointState.map((i, index) => {
                    return (<Star rating={i} key={index}/>)
                })}
                <View style={styles.progressBarWrapper}>
                    <View  style={styles.subProgressBar}>
                        <View style={styles.progressBar}>
                            <Progress.Bar progress={rating} height={10} width={50} />
                        </View>
                        <Text>{adaptTerm(rating)}</Text>
                    </View>
                    <View style={styles.peopleWrapper}>
                        <Text style={styles.people}>{people}</Text>
                        <Ionicons name='people' size={22} color='#0969da' />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        padding: 3
    },
    block: {
        flexDirection: "row",
        alignItems: "center",
    },
    progressBarWrapper: {
        width: "45%",
        height: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 4,
    },
    progressBar: {
        height: 5,
        margin: 5,
    },
    label: {
        paddingLeft: 10,
    },
    people: {
        marginLeft: 10,
    },
    subProgressBar: {
        flexDirection: "row",
    },
    peopleWrapper: {
        flexDirection: "row",
    },
})