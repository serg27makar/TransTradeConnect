import {langs, userType} from "../const/const";
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

export const traderTotalResult = (calc, info, down) => {
    const calcCounter = totalResult(calc);
    const infoCounter = totalResult(info);
    const downCounter = totalResult(down);
    const count = calcCounter.count + infoCounter.count + downCounter.count;
    const totalCount = calcCounter.totalCount + infoCounter.totalCount + downCounter.totalCount;
    return {count, totalCount}
}

export const calculatePercent = (val, totalPeople) => {
    return (Math.round((Number(val) / totalPeople) * 10000) / 10000);
}

export const detailedResult = (rating, totalPeople, type, subType = null) => {
    const ratings = [];
    const labelName = labelNameSwitcher(type, subType)
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

export const addRating = (type, subType = null) => {
    const ratings = [];
    const labelName = labelNameSwitcher(type, subType)
    for (let i = 1; i <= 5; i++) {
        const item = {
            point: i,
            label: labelName + i,
        }
        ratings.push(item)
    }
    return ratings;
}

export const labelNameSwitcher = (type, subType) => {
    if (type === userType.TRADER) {
        switch (subType) {
            case "calc":
                return "CalcRating";
            case "info":
                return "InfoRating";
            case "down":
                return "DownRating";
        }
    }
    switch (type) {
        case userType.CARRIER:
            return "CarrierRating";
        case userType.DISPATCHER:
            return "DispatcherRating";
    }
}

export const generateMachineID = () => {
    const chrs = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
    let str = '';
    for (let i = 0; i < 18; i++) {
        const pos = Math.floor(Math.random() * chrs.length);
        str += chrs.substring(pos,pos+1);
    }
    return "d_id:" + str;
}

export const dateFormat = (dateObj) => {
    if (!dateObj) return null
    dateObj = new Date(dateObj)
    let date = dateObj.getDate();
    if (date < 10) {
        date = "0" + date;
    }
    let month = dateObj.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    let year = dateObj.getFullYear();
    let hours = dateObj.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }
    let minutes = dateObj.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return year + "/" + month + "/" + date + " " + hours + ":" + minutes;
}