import axios from "axios";
import type { AxiosRequestConfig } from "axios";

const BASE_URL = 'http://192.168.162.167:8000/docs';

const filterParams = (params: object) => {
    for (let key in params) {
        if (params[key as keyof typeof params] === "") {
            delete params[key as keyof typeof params];
        }
    }
    return params;
};

const makeRequest = ({
        url = "/",
        method = "get",
        responseType = "json",
        headers,
        params,
        data,
        paramsSerializer = filterParams(params),
    }: AxiosRequestConfig) =>
    axios({
        url: `${BASE_URL}${url}`,
        method,
        responseType,
        headers,
        params: paramsSerializer,
        data,
    });

export default makeRequest;
