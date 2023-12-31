import React from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {RootReducer} from "./src/utils/reducer/reducer";
import {MainScreen} from "./src/MainScreen";
import {AppSettingsContextProvider} from "./src/AppSettingsContextProvider";

const store = createStore(RootReducer);

export default function App() {

    return (
        <Provider store={store}>
            <AppSettingsContextProvider>
                <MainScreen />
            </AppSettingsContextProvider>
        </Provider>
    );
}