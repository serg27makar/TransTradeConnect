import AsyncStorage from '@react-native-async-storage/async-storage';
import CRUDService from "./CRUDService";

const apiService = new CRUDService();

export const postRegister = (user, callback) => {
    apiService.post(`/users/register`, user).then(async res => {
        if (res && res.data && res.data.insertedId) {
            await AsyncStorage.setItem("UserId", res.data.insertedId);
            callback(res.data.insertedId)
        } else {
            callback(false)
        }
    })
};

export const postLogin = (user, callback) => {
    apiService.post(`/users/login`, user).then(async res => {
        if (res && res.data && res.data.UserID) {
            await AsyncStorage.setItem("UserId", res.data.UserID)
            callback(res.data.UserID)
        } else {
            callback(false)
        }
    })
};

export const postUserInfo = (user, callback) => {
    apiService.post(`/users/addUserInfo`, user).then(async res => {
        if (res && res.data && res.data.insertedId) {
            callback(true)
        } else {
            callback(false)
        }
    })
}
