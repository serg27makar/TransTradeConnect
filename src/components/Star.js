import Svg, {Polygon} from 'react-native-svg';
import React from 'react';
import {View} from 'react-native';

export const Star = ({rating}) => {
    return (
        <View>
            <Svg height="30" width="30">
                <Polygon
                    points="16,7 19,16 27,16 22,22 24,30 16,24 8,30 10,22 5,16 13,16"
                    fill={rating ? "lime" : "gray"}
                    stroke="purple"
                    strokeWidth="1"
                />
            </Svg>
        </View>
    );
}