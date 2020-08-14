import axios from "axios";

const callApi = async (method: string, path: string, data?: any, params = {}) => {
    const headers = {
        Accept: 'application/json',
        "Content-Type": "application/json",
    };
    const baseUrl = "http://133.186.209.113:3003/api";
    const fullUrl = `${baseUrl}${path}`;
    if (method === "get" || method === "delete") {
        return axios[method](fullUrl, { headers, params });
    } else {
        return axios[method](fullUrl, data, { headers });
    }
};

export default {
    checkApp: (data: any) => callApi("post", "/auth/checkApp/", data),
    help: () => callApi("post", "/auth/help/"),
    logIn: (data: any) => callApi("post", "/auth/signin/", data),
    signUp: (data: any) => callApi("post", "/auth/signin3/", data),
    checkSMS: (data: any) => callApi("post", "/auth/checksms/", data),
    getSMS: (data: any) => callApi("post", "/auth/getsms/", data),
    findPwd: (data: any) => callApi("post", "/auth/findPwd/", data),
}

