import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Star} from "./Star";
import * as Progress from 'react-native-progress';

export const StarRating = ({point, rating, label}) => {
    const [pointState, setPointState] = useState([])
    const points = () => {
        let likes = [];
        for (let i = 1; i <= 5; i++) {
            const isStar = point >= i
            likes.push(isStar)
        }
        setPointState(likes)
    }
    useEffect(() => {
        points();
    }, [point])

    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.block}>
                {pointState.map((i, index) => {
                    return (<Star rating={i} key={index}/>)
                })}
                <View style={styles.progressBarWrapper}>
                    <View style={styles.progressBar}>
                        <Progress.Bar progress={rating} height={10} width={100} />
                    </View>
                    <Text>{rating * 100}%</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flexDirection: "row",
        alignItems: "center",
    },
    progressBarWrapper: {
        height: 25,
        flexDirection: "row",
        padding: 4,
    },
    progressBar: {
        height: 5,
        margin: 5,
    },
    label: {
        paddingLeft: 10
    }
})