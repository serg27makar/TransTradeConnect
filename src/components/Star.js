import Svg, {Polygon} from 'react-native-svg';
import React from 'react';
import {View} from 'react-native';

export const Star = ({rating}) => {
    return (
        <View>
            <Svg height="40" width="40">
                <Polygon
                    points="20,9 24,20 34,20 27,27 30,38 20,30 10,38 13,27 6,20 16,20"
                    fill={rating ? "lime" : "gray"}
                    stroke="purple"
                    strokeWidth="1"
                />
            </Svg>
        </View>
    );
}