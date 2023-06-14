import {useSelector} from "react-redux";
import {langs} from "../const/const";
import {ua} from "../../assets/langs/ua";
import {ru} from "../../assets/langs/ru";

export const Langs = (val) => {
    const state = useSelector(state => state.users);
    let out = "";
    switch (state.lang) {
        case langs.UA:
            out = ua[val];
            break
        case langs.RU:
            out = ru[val]
            break
    }
    return out
}