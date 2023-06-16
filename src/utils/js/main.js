import {langs} from "../const/const";
import {ua} from "../../assets/langs/ua";
import {ru} from "../../assets/langs/ru";
import {data} from "../../assets/mok/data.js"

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

export const findByPhone = (val) => {
    return data.filter(i => i.phone === val)[0];
}

export const totalResult = (ratingArr) => {
    let totalCount = 0;
    let count = 0;
    let iter = 0;
    for (let i in ratingArr) {
        iter ++;
        totalCount = totalCount + Number(ratingArr[i])
        count = count + (iter * Number(ratingArr[i]))
    }
    return {count, totalCount}
}

export const calculatePercent = (val, totalPeople) => {
    return (Math.round((Number(val) / totalPeople) * 10000) / 10000);
}

export const detailedResult = (rating, totalPeople, type) => {
    const ratings = [];
    const labelName = type === "carrier" ? "CarrierRating" : "DispatcherRating"
    let iter = 0;
    for (let i in rating) {
        iter ++;
        const item = {
            point: iter,
            rating: calculatePercent(rating[i], totalPeople),
            label: labelName + iter,
            people: rating[i],
        }
        ratings.push(item)
    }
    return ratings
}