import {createContext, useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppSettingsContext = createContext({})

export const AppSettingsContextProvider = ({children}) => {
    const [appSettingsInitialized, setAppSettingsInitialized] = useState(false)
    const [appSettings, setAppSettings] = useState({})

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

    const setSettings = (key, value) => {
        const mergedSettings = {
            ...appSettings,
            [key]: value
        }
        setAppSettings(mergedSettings)

        AsyncStorage.setItem('appSettings', JSON.stringify(mergedSettings))
    }

    return (
        <AppSettingsContext.Provider value={{
            appSettings,
            appSettingsInitialized,
            setSettings,
        }}>
            {children}
        </AppSettingsContext.Provider>
    )
}