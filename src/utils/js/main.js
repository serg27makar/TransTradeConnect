import {langs} from "../const/const";
import {ua} from "../../assets/langs/ua";
import {ru} from "../../assets/langs/ru";

export const Translator = (lang, val) => {
    let out = "";
    switch (lang) {
        case langs.UA:
            out = ua[val];
            break
        case langs.RU:
            out = ru[val]
            break
    }
    return out
}