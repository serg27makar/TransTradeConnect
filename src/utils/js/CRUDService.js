import axios from 'axios'

const axiosIns = axios.create({})

const catchError = (error) => {
    console.log("-+-", error)
    return error
}

const prodServer = "http://ec2-3-65-45-194.eu-central-1.compute.amazonaws.com:80";
const homeWiFiServer = "http://192.168.0.116:3001";
const workWiFiServer = "http://192.168.0.127:3001";
const workWiFiServer2 = "http://192.168.1.55:3001";

export default function CRUDService() {
    this.APIUrl = prodServer;
    this.get = function (path, signal = null) {
        return this.request("GET", path, null, signal)
            .catch(error => catchError(error))
    }
    this.post = (path, data, headers = null) => {
        return this.request("POST", path, data, headers)
            .catch(error => catchError(error))
    }
    this.put = (path, data) => {
        return this.request("PUT", path, data)
            .catch(error => catchError(error))
    }
    this.delete = (path) => {
        return this.request("DELETE", path)
            .catch(error => catchError(error))
    }
    this.request = (method, path, data = null, headers = null) => {
        switch (method) {
            case "GET":
                return axiosIns.get(this.APIUrl + path, headers);
            case "POST":
                return axiosIns.post(this.APIUrl + path, data, headers);
            case "PUT":
                return axiosIns.put(this.APIUrl + path, data);
            case "DELETE":
                return axiosIns.delete(this.APIUrl + path);
        }
    }
}
