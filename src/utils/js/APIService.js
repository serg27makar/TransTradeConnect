import CRUDService from "./CRUDService";

const apiService = new CRUDService();

export const postRegister = (user, callback) => {
    apiService.post(`/users/register`, user).then(async res => {
        if (res && res.data && res.data.insertedId) {
            callback(res.data.insertedId)
        } else if (res && res.data && res.data.errMsg){
            callback(res.data)
        } else {
            callback(false)
        }
    })
};

export const postLogin = (user, callback) => {
    apiService.post(`/users/login`, user).then(async res => {
        if (res && res.data && res.data.UserID) {
            callback(res.data)
        } else if (res && res.data && res.data.errMsg){
            callback(res.data)
        } else {
            callback(false)
        }
    })
};

export const addUserInfo = (user, callback) => {
    apiService.post(`/users/addUserInfo`, user).then(async res => {
        if (res && res.data && res.data.insertedId) {
            callback(true)
        } else {
            callback(false)
        }
    })
}

export const getUserInfo = (phone, callback) => {
    apiService.post(`/users/getUserInfo`, phone).then(async res => {
        if (res && res.data) {
            callback(res.data)
        } else {
            callback(false)
        }
    })
}

export const addSearchToHistory = (data, callback) => {
    apiService.post(`/users/addSearchToHistory`, data).then(res => {
        if (res && res.data) {
            callback(res.data)
        } else {
            callback(false)
        }
    })
}

export const getSearchUsersInfo = (data, callback) => {
    apiService.post(`/users/getSearchUsersInfo`, data).then(res => {
        if (res && res.data) {
            callback(res.data)
        } else {
            callback(false)
        }
    })
}

export const editUserInfo = (user, callback) => {
    apiService.post(`/users/editUserInfo`, user).then(async res => {
        if (res && res.data) {
            callback(res.data)
        } else {
            callback(false)
        }
    })
}

export const checkPhoneToExistDB = (number, callback) => {
    apiService.post("/users/checkPhoneToExist", {Phone: number}).then(async res => {
        if (res && res.data) {
            callback(res.data)
        } else {
            callback(false)
        }
    })
}