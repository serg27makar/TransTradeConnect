import AsyncStorage from '@react-native-async-storage/async-storage';

const APIService = new APIService();

export const postRegister = (user, callbackInfo) => {
    axios.post(Url + `/users/register`, user)
        .then(req => {
            if (req.data.insertedId) {
                localStorage.UserId = req.data.insertedId;
            }
            callbackInfo(req.data.insertedId);
        }).catch(err => {
        console.log(err);
    })
};

export const postLogin = async (user) => {
    return await APIService.post(`/users/login`, user).then(async res => {
        await AsyncStorage.setItem("UserId", res.data.UserID.toString());
        return res
    })
};
