import {useEffect, useState} from "react";
import axios from 'axios'

const axiosIns = axios.create({})

const prodServer = "http://ec2-3-65-45-194.eu-central-1.compute.amazonaws.com:80";
const homeWiFiServer = "http://192.168.0.116:3001";
const workWiFiServer = "http://192.168.0.127:3001";

const APIUrl = prodServer;

export default function APIService () {
    const [obj, setObj] = useState(null)
    const [response, setResponse] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        if (obj) {
            CRUD(obj.method, obj.rout, obj.data)
                .then(res => callback(res))
                .catch(err => catchError(err))
        }
        return () => {
            setObj(null)
        }
    }, [obj])

    const catchError = (err) => {
        console.log(err)
        setErrorMsg(err)
    }

    const callback = (res) => {
        if (res && res.data) {
            setResponse(res.data)
        } else {
            setErrorMsg({
                errMsg: "no_result"
            })
        }
    }

    const CRUD = (method, path, data = null) => {
        switch (method) {
            case "GET":
                return axiosIns.get(APIUrl + path);
            case "POST":
                return axiosIns.post(APIUrl + path, data);
            case "PUT":
                return axiosIns.put(APIUrl + path, data);
            case "DELETE":
                return axiosIns.delete(APIUrl + path);
        }
    }

    return [setObj, response, errorMsg];
}