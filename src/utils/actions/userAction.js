import {CHANGE_LANG} from "../const/types";

export const changeLang = lang => (
    {
        type: CHANGE_LANG,
        payload: lang,
    }
);