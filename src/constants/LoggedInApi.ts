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

const noPortApi = async (method: string, path: string, data?: any, params = {}) => {
    const headers = {
        Accept: 'application/json',
        "Content-Type": "application/json",
    };
    const baseUrl = "http://133.186.209.113/api/v2";
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
    updatePush: (data: any) => oldApi("post", "/Employee/updatePush/", data),
    getstoreinfo: (data: any) => callApi("post", "/auth/getstoreinfo/", data),
    getCertificate: (data: any) => callApi("post", "/auth/getCERTIFICATE/", data),

    getPush: (data: any) => oldApi("post", "/Employee/getPush", data),
    toggleMember: (data: any) => oldApi("post", "/Auth/toggleMember", data),
    changeName: (data: any) => oldApi("post", "/Auth/changeName", data),
    cupdflistcheck: (MEMBER_SEQ: string) => oldApi("get", `/Store/cupdflistcheck?MEMBER_SEQ=${MEMBER_SEQ}`),
    cuvideolistcheck: (MEMBER_SEQ: string) => oldApi("get", `/Store/cuvideolistcheck?MEMBER_SEQ=${MEMBER_SEQ}`),
    setpdfcheck: (PDF_SEQ: string,
        MEMBER_SEQ: string) => oldApi("get", `/Store/setpdfcheck?PDF_SEQ=${PDF_SEQ}&MEMBER_SEQ${MEMBER_SEQ}`),
    setvideocheck: (PDF_SEQ: string,
        MEMBER_SEQ: string) => oldApi("get", `/Store/setvideocheck?PDF_SEQ=${PDF_SEQ}&MEMBER_SEQ${MEMBER_SEQ}`),
    seteducheck: (EMP_FILE_SEQ: string,
        MEMBER_SEQ: string) => oldApi("get", `/Store/setvideocheck?EMP_FILE_SEQ=${EMP_FILE_SEQ}&MEMBER_SEQ${MEMBER_SEQ}`),
    closeList: (MEMBER_SEQ: string) => oldApi("get", `/Store/Close_list?MEMBER_SEQ=${MEMBER_SEQ}`),
    endList: (MEMBER_SEQ: string) => oldApi("get", `/Store/Close_list?MEMBER_SEQ=${MEMBER_SEQ}`),
    cuedulistcheck: (MEMBER_SEQ: string) => oldApi("get", `/Store/cuedulistcheck?MEMBER_SEQ=${MEMBER_SEQ}`),
    storeHealthEmpList: (MEMBER_SEQ: string, STORE_SEQ: string, STORE: string) => oldApi("get", `/Store/store_health_emp_list?STORE_SEQ=${STORE_SEQ}&STORE=${STORE}&MEMBER_SEQ=${MEMBER_SEQ}`),

    storeHealthEmpDetail: (EMP_SEQ: string) => oldApi("get", `/Store/store_health_emp_detail?EMP_SEQ=${EMP_SEQ}`),
    attendanceWork: (data: any) => oldApi("post", "/StoreAuth/attendance_work1", data),
    attendanceOffWork: (data: any) => oldApi("post", "/StoreAuth/attendance_offwork1/", data),
    requestJoin: (data: any) => oldApi("post", "/Employee/request_join/", data),
    storeList: (MEMBER_SEQ: string,
        STORE: string) => oldApi("get", `/Store/store_list?MEMBER_SEQ=${MEMBER_SEQ}&STORE=${STORE}`),
    checkList: (data: any) => oldApi("post", "/StoreAuth/checklist/", data),
    updateStore: (data: any) => oldApi("put", "/Store/update2", data),
    addStore: (data: any) => oldApi("post", "/Store/insert22", data),
    getCuCode: (code: string) => oldApi("get", `/Store/getCuCode?code=${code}`),
    getEmpLists: (STORE_SEQ: string) => oldApi("get", `/Store/get_emp_lists?STORE_SEQ=${STORE_SEQ}`),
    getWorkingEmpTotalPay: (YEAR: number, MONTH: number, STORE_SEQ: string) => oldApi("get", `/Store/get_working_emp_totalpay2?YEAR=${YEAR}&MONTH=${MONTH}&STORE_SEQ=${STORE_SEQ}`),
    cancelJoin: (data: any) => callApi("post", "/auth/canceljoin/", data),
    getWaitEmpList: (STORE_SEQ: string) => oldApi("get", `/Store/get_wait_emp_list?STORE_SEQ=${STORE_SEQ}`),
    rejectJoin: (data: any) => oldApi("post", "/Employee/reject_join", data),
    sendOneEmp: (data: any) => oldApi("post", "/Auth/sendOneEmp", data),
    monthLists: (STORE_SEQ: string,
        EMP_SEQ: string,
        year: number,
        month: number) => noPortApi("get", `/PayMents/month_lists?STORE_ID=${STORE_SEQ}&EMP_ID=${EMP_SEQ}&YEAR=${year}&MONTH=${month}`),
    getShelfLifeData: (data: any) => callApi("post", "/auth/getshelfLifeData/", data),
    checkShelfLifeData: (data: any) => callApi("post", "/auth/checkShelfLifeData/", data),
    getAllShelfLifeData: (data: any) => callApi("post", "/auth/getAllshelfLifeData/", data),
}

