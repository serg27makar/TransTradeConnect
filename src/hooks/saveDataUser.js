import {useDispatch, useSelector} from "react-redux";
import {addUserInfo, editUserInfo, getUserInfo} from "../utils/js/APIService";
import {Alert} from "react-native";
import {Translator} from "../utils/js/main";
import {setSearchData} from "../utils/actions/userAction";

export default function useDataUser() {
    const state = useSelector(state => state.users);
    const dispatch = useDispatch();

    const successfullyAdded = () => {
        Alert.alert(Translator(state.lang, "successfullyAdded"))
        getUserInfo({Phone: state.addPhone}, res => {
            if (res) {
                dispatch(setSearchData(res))
            }
        })
    }

    return (User) => {
        if (state.editClient) {
            User = {...User, id: state.editClient._id}
            editUserInfo(User, res => {
                if (res) {
                    successfullyAdded();
                } else {
                    Alert.alert(Translator(state.lang, "somethingWentWrong"))
                }
            })
        } else {
            addUserInfo(User, res => {
                if (res) {
                    successfullyAdded();
                } else {
                    Alert.alert(Translator(state.lang, "somethingWentWrong"))
                }
            })
        }
    };
}