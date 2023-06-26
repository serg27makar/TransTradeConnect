import React, {useEffect, useState} from "react";
import {StyleSheet, View} from 'react-native';
import {Navbar} from "./src/Navbar";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from "@react-navigation/native";
import {Home} from "./src/pages/Home";
import {Dispatcher} from "./src/pages/Dispatcher";
import {Trader} from "./src/pages/Trader";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {RootReducer} from "./src/utils/reducer/reducer";
import {LoginScreen} from "./src/pages/Login";
import {RegistrationScreen} from "./src/pages/Registration";
import {patch} from "./src/utils/const/const";
import {checkLogin} from "./src/utils/js/main";
import {AddUser} from "./src/pages/AddUser";

const store = createStore(RootReducer);

export default function App() {
    const Stack = createNativeStackNavigator();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        checkLogin().then(res => setIsLogin(res))
    }, [])

    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Navbar/>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={isLogin ? patch.HOME : patch.LOGIN}>
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
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
