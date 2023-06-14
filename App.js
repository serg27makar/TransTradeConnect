import React from "react";
import {StyleSheet, View} from 'react-native';
import {Navbar} from "./src/Navbar";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {FirstScreen} from "./src/FirstScreen";
import {ScreenSecond} from "./src/ScreenSecond";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
    const Stack = createNativeStackNavigator();

    return (
        <View style={styles.container}>
            <Navbar title={"To Do App"}/>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="first">
                    <Stack.Screen
                        name="first" component={FirstScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="second"
                        component={ScreenSecond}
                        options={{
                            headerShown: false
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
