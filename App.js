import React from "react";
import {StyleSheet, View} from 'react-native';
import {Navbar} from "./src/Navbar";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import {Home} from "./src/pages/Home";
import {Carrier} from "./src/pages/Carrier";
import {Dispatcher} from "./src/pages/Dispatcher";
import {Trader} from "./src/pages/Trader";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {RootReducer} from "./src/utils/reducer/reducer";

const store = createStore(RootReducer);

export default function App() {
    const Stack = createNativeStackNavigator();

    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Navbar/>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="home">
                        <Stack.Screen
                            name="home" component={Home}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="carrier"
                            component={Dispatcher}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="trader"
                            component={Trader}
                            options={{
                                headerShown: false
                            }}
                        />
                        <Stack.Screen
                            name="dispatcher"
                            component={Dispatcher}
                            options={{
                                headerShown: false
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
