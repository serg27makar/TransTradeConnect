import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Star} from "./Star";
import * as Progress from 'react-native-progress';

export const StarRating = () => {
    const [pointState, setPointState] = useState([])
    const starRating = 35
    const point = 2
    // const result = Math.round((data.expense / data.income) * 100)

    const points = () => {
        let likes = [];
        for (let i = 0; i < 5; i++) {
            likes.push(point <= i)
        }
        setPointState(likes)
    }
    useEffect(() => {
        points();
    }, [])

    return (
        <View style={styles.block}>
            {pointState.map(i => {
                return (<Star rating={i}/>)
            })}
           <View style={styles.progressBar}>
               <Progress.Bar progress={0.3} height={10} width={50} />
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flexDirection: "row",
        alignItems: "center",
    },
    progressBar: {
        height: 10,
    }
})