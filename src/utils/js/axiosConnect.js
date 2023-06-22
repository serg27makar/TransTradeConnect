import AsyncStorage from '@react-native-async-storage/async-storage';
import APIService from "./APIService";

const apiService = new APIService();

export const postRegister = (user) => {
    apiService.post(`/users/register`, user).then(async res => {
        if (res) await AsyncStorage.setItem("UserId", res.data.insertedId);
    })
};

export const postLogin = (user) => {
    apiService.post(`/users/login`, user).then(async res => {
        if (res) await AsyncStorage.setItem("UserId", res.data.insertedId);
    })
};
