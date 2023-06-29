import React from "react";
import {StyleSheet, View} from 'react-native';
import {Navbar} from "./Navbar";
import {NavigationContainer} from "@react-navigation/native";
import {Home} from "./pages/Home";
import {Dispatcher} from "./pages/Dispatcher";
import {Trader} from "./pages/Trader";
import {LoginScreen} from "./pages/Login";
import {RegistrationScreen} from "./pages/Registration";
import {patch} from "./utils/const/const";
import {AddUser} from "./pages/AddUser";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useSelector} from "react-redux";


export const MainScreen = () => {
    const Stack = createNativeStackNavigator();
    const state = useSelector(state => state.users);

    return (
        <View style={styles.container}>
            <Navbar/>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={state.isLogin ? patch.HOME : patch.LOGIN}>
                    <Stack.Screen
                        name={patch.HOME}
                        component={Home}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name={patch.ADD_USER}
                        component={AddUser}
                        options={{
                            headerShown: false,
                            headerTitle: ""
                        }}
                    />
                    <Stack.Screen
                        name={patch.DISPATCHER}
                        component={Dispatcher}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name={patch.TRADER}
                        component={Trader}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name={patch.CARRIER}
                        component={Dispatcher}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name={patch.LOGIN}
                        component={LoginScreen}
                        options={{
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name={patch.REGISTRATION}
                        component={RegistrationScreen}
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