import {createContext, useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppSettingsContext = createContext({});

const UserInit = {
    UserID: "",
    UserName: "",
    UserPhone: "",
    DeviceID: "",
    UserType: "",
    UserRole: "",
    Permissions: [],
}
const UserState = {}

export const AppSettingsContextProvider = ({children}) => {
    const [appSettingsInitialized, setAppSettingsInitialized] = useState(false)
    const [appSettings, setAppSettings] = useState(UserState)

    let mergedSettings = appSettings;

    useEffect(() => {
        AsyncStorage
            .getItem('appSettings')
            .then(data => {
                if (data) {
                    setAppSettings(JSON.parse(data))
                }
                setAppSettingsInitialized(true)
            })
    }, [])

    useEffect(() => {
        mergedSettings = appSettings;
        setAppSettingsInitialized(true)
    }, [appSettings])

    const setSettings = (key, value) => {
        mergedSettings = {
            ...mergedSettings,
            [key]: value
        }
        setAppSettings(mergedSettings)

        AsyncStorage.setItem('appSettings', JSON.stringify(mergedSettings)).then(() => {})
    }

    const logOutAsync = () => {
        AsyncStorage.removeItem('appSettings').then(() => {
            setAppSettings(UserState);
            setAppSettingsInitialized(true)
        })
    }

    return (
        <AppSettingsContext.Provider value={{
            appSettings,
            appSettingsInitialized,
            setSettings,
            logOutAsync,
        }}>
            {children}
        </AppSettingsContext.Provider>
    )
}