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

const oldApi = async (method: string, path: string, data?: any, params = {}) => {
    const headers = {
        Accept: 'application/json',
        "Content-Type": "application/json",
    };
    const baseUrl = "http://133.186.209.113:80/api/v2";
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
    updatePush: (data: any) => oldApi("post", "/Employee/updatePush", data),
    getPush: (data: any) => oldApi("post", "/Employee/getPush", data),
    toggleMember: (data: any) => oldApi("post", "/Auth/toggleMember", data),
    changeName: (data: any) => oldApi("post", "/Auth/changeName", data),
    cupdflistcheck: (MEMBER_SEQ: string) => oldApi("get", `/Store/cupdflistcheck?MEMBER_SEQ=${MEMBER_SEQ}`),
    cuvideolistcheck: (MEMBER_SEQ: string) => oldApi("get", `/Store/cuvideolistcheck?MEMBER_SEQ=${MEMBER_SEQ}`),
    setpdfcheck: (PDF_SEQ: string,
        MEMBER_SEQ: string) => oldApi("get", `/Store/setpdfcheck?PDF_SEQ=${PDF_SEQ}&MEMBER_SEQ${MEMBER_SEQ}`),
    setvideocheck: (PDF_SEQ: string,
        MEMBER_SEQ: string) => oldApi("get", `/Store/setvideocheck?PDF_SEQ=${PDF_SEQ}&MEMBER_SEQ${MEMBER_SEQ}`),
    closeList: (MEMBER_SEQ: string) => oldApi("get", `/Store/Close_list?MEMBER_SEQ=${MEMBER_SEQ}`),
    endList: (MEMBER_SEQ: string) => oldApi("get", `/Store/Close_list?MEMBER_SEQ=${MEMBER_SEQ}`),
    cuedulistcheck: (MEMBER_SEQ: string) => oldApi("get", `/Store/cuedulistcheck?MEMBER_SEQ=${MEMBER_SEQ}`),
}

