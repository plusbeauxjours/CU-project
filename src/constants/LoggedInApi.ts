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
    changePwd: (data: any) => oldApi("post", "/Auth/changePwd", data),
    checkApp: (data: any) => callApi("post", "/auth/checkApp/", data),
    help: () => callApi("post", "/auth/help/"),
    logIn: (data: any) => callApi("post", "/auth/signin/", data),
    signUp: (data: any) => callApi("post", "/auth/signin3/", data),
    checkSMS: (data: any) => callApi("post", "/auth/checksms/", data),
    getSMS: (data: any) => callApi("post", "/auth/getsms/", data),
    findPwd: (data: any) => callApi("post", "/auth/findPwd/", data),
    updatePush: (data: any) => oldApi("post", "/Employee/updatePush/", data),
    getStoreInfo: (data: any) => callApi("post", "/auth/getstoreinfo/", data),
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
    endList: (MEMBER_SEQ: string) => oldApi("get", `/Store/END_list?MEMBER_SEQ=${MEMBER_SEQ}`),
    cuedulistcheck: (MEMBER_SEQ: string) => oldApi("get", `/Store/cuedulistcheck?MEMBER_SEQ=${MEMBER_SEQ}`),
    storeHealthEmpList: (MEMBER_SEQ: string, STORE_SEQ: string, STORE: string) => oldApi("get", `/Store/store_health_emp_list?STORE_SEQ=${STORE_SEQ}&STORE=${STORE}&MEMBER_SEQ=${MEMBER_SEQ}`),

    storeHealthEmpDetail: (EMP_SEQ: string) => oldApi("get", `/Store/store_health_emp_detail?EMP_SEQ=${EMP_SEQ}`),
    attendanceWork: (data: any) => oldApi("post", "/StoreAuth/attendance_work1", data),
    attendanceOffWork: (data: any) => oldApi("post", "/StoreAuth/attendance_offwork1/", data),
    requestJoin: (data: any) => oldApi("post", "/Employee/request_join/", data),
    storeList: (MEMBER_SEQ: string,
        STORE: string) => oldApi("get", `/Store/store_list?MEMBER_SEQ=${MEMBER_SEQ}&STORE=${STORE}`),
    getAuthCheckList: (data: any) => oldApi("post", "/StoreAuth/checklist/", data),
    updateStore: (data: any) => oldApi("put", "/Store/update2", data),
    addStore: (data: any) => oldApi("post", "/Store/insert22", data),
    getCuCode: (code: string) => oldApi("get", `/Store/getCuCode?code=${code}`),
    getEmpLists: (STORE_SEQ: string) => oldApi("get", `/Store/get_emp_lists?STORE_SEQ=${STORE_SEQ}`),
    getWorkingEmpTotalPay: (YEAR: string, MONTH: string, STORE_SEQ: string) => oldApi("get", `/Store/get_working_emp_totalpay2?YEAR=${YEAR}&MONTH=${MONTH}&STORE_SEQ=${STORE_SEQ}`),
    cancelJoin: (data: any) => callApi("post", "/auth/canceljoin", data),
    getWaitEmpList: (STORE_SEQ: string) => oldApi("get", `/Store/get_wait_emp_list?STORE_SEQ=${STORE_SEQ}`),
    rejectJoin: (data: any) => oldApi("post", "/Employee/reject_join", data),
    sendOneEmp: (data: any) => oldApi("post", "/Auth/sendOneEmp", data),
    monthLists: (STORE_ID: string,
        EMP_ID: string,
        YEAR: string,
        MONTH: string) => noPortApi("get", `/PayMents/month_lists?STORE_ID=${STORE_ID}&EMP_ID=${EMP_ID}&YEAR=${YEAR}&MONTH=${MONTH}`),
    getShelfLifeData: (data: any) => callApi("post", "/auth/getshelfLifeData/", data),
    checkShelfLifeData: (data: any) => callApi("post", "/auth/checkShelfLifeData/", data),
    getAllShelfLifeData: (data: any) => callApi("post", "/auth/getAllshelfLifeData/", data),
    deleteShelfLifeData: (data: any) => callApi("post", "/auth/deleteshelfLifeData/", data),
    updateShelfLifeData: (data: any) => callApi("post", "/auth/updateshelfLifeData/", data),
    checkOcr: (data: any) => callApi("post", "/auth/checkocr/", data),
    checkocr1: (data: any) => callApi("post", "/auth/checkocr1/", data),
    saveOcr: (data: any) => callApi("post", "/auth/saveocr/", data),
    saveOcr1: (data: any) => callApi("post", "/auth/saveocr1/", data),
    updateOcr: (data: any) => callApi("post", "/auth/updateocr/", data),
    deleteStoreHealth: (data: any) => callApi("post", "/auth/deleteStoreHealth/", data),
    getAllCeoHealth: (data: any) => callApi("post", "/auth/getAllCeoHealth/", data),
    deleteCeoHealth: (data: any) => callApi("post", "/auth/deleteCeoHealth/", data),
    setShelfLifeData: (data: any) => callApi("post", "/auth/setshelfLifeData/", data),
    sendEmp2: (data: any) => oldApi("post", "/Auth/sendEmp2/", data),
    toggleCalendar: (data: any) => oldApi("post", "/Employee/toggleCalendar/", data),
    getEmpPay: (data: any) => oldApi("post", "/Employee/getEmpPay/", data),
    updateEmpSchedules3: (data: any) => oldApi("post", "/Employee/update_emp_schedules3/", data),
    getEmp: (EMP_SEQ: string) => oldApi("get", `/Employee/get?EMP_SEQ=${EMP_SEQ}`),
    getSchedules: (EMP_SEQ: string,
        YEAR: string,
        MONTH: string) => oldApi("get", `/Employee/get_schedules?EMP_SEQ=${EMP_SEQ}&YEAR=${YEAR}&MONTH=${MONTH}`),
    getChecklist: (STORE: string,
        DATE: string) => oldApi("get", `/Store/Checklist?STORE=${STORE}&DATE=${DATE}`),

    ////////////
    //
    getChecklistAll: (storeID: string,
        YEAR: string,
        MONTH: string
    ) => oldApi("get", `/Store/ChecklistAll?STORE=${storeID}&YEAR=${YEAR}&MONTH=${MONTH}`),
    //
    ////////////

    // getChecklistAll: (data: any) => callApi("post", "/auth/getAllchecklist", data),
    checkRegister: (data: any) => oldApi("post", "/Store/CheckRegister/", data),
    checkUpdate: (data: any) => oldApi("post", "/Store/CheckUpdate/", data),
    getEmployeeList: (data: any) => oldApi("post", "/Employee/getEmpList/", data),
    getAllCheckSchedules: (data: any) => callApi("post", "/auth/getAllCheckSchedules/", data),
    setCheckListImg2: (data: any) => callApi("post", "/auth/setCheckListImg2/", data),
    setCheckList2: (data: any) => callApi("post", "/auth/setCheckList2/", data),
    setNoticeFavorite: (data: any) => callApi("post", "/auth/setNoticeFavorite/", data),
    getNoticeAll: (
        STORE_SEQ: string,
        YEAR: string,
        MONTH: number,
        MEMBER_SEQ: string,
        TYPE: string
    ) => oldApi("get", `/Store/noticeAll?STORE_SEQ=${STORE_SEQ}&YEAR=${YEAR}&MONTH=${MONTH}&MEMBER_SEQ=${MEMBER_SEQ}&TYPE=${TYPE}`),
    getNotice31: (STORE_SEQ: string,
        MEMBER_SEQ: string, DATE: string) => oldApi("get", `/Employee/getNotice3?STORE_SEQ=${STORE_SEQ}&MEMBER_SEQ=${MEMBER_SEQ}&STORE=1&DATE=${DATE}`),
    getNotice30: (STORE_SEQ: string,
        MEMBER_SEQ: string, DATE: string) => oldApi("get", `/Employee/getNotice3?STORE_SEQ=${STORE_SEQ}&MEMBER_SEQ=${MEMBER_SEQ}&STORE=0&DATE=${DATE}`),
    getCuNotice: (STORE_SEQ: string,
        MEMBER_SEQ: string) => oldApi("get", `/Employee/getCuNotice?STORE_SEQ=${STORE_SEQ}&MEMBER_SEQ=${MEMBER_SEQ}`),
    editNoticeComment: (COM_SEQ: string,
        CONTENTS: string) => oldApi("get", `/Employee/editNoticeComment?COM_SEQ=${COM_SEQ}&CONTENTS=${CONTENTS}`),
    delNoticeComment: (COM_SEQ: string) => oldApi("get", `/Employee/delNoticeComment?COM_SEQ=${COM_SEQ}`),
    setNoticeComment: (
        NOTICE_SEQ: string,
        EMP_NAME: string,
        MEMBER_SEQ: string,
        CONTENTS: string,
        STORE: string) => oldApi("get", `/Employee/setNoticeComment?NOTICE_SEQ=${NOTICE_SEQ}&EMP_NAME=${EMP_NAME}&MEMBER_SEQ=${MEMBER_SEQ}&CONTENTS=${CONTENTS}&STORE=${STORE}`),
    getNoticeComment: (
        NOTICE_SEQ: string,
        MEMBER_SEQ: string,
        STORE_SEQ: string,
        TITLE: string,
    ) => oldApi("get", `/Employee/getNoticeComment?NOTICE_SEQ=${NOTICE_SEQ}&MEMBER_SEQ=${MEMBER_SEQ}&STORE_SEQ=${STORE_SEQ}&TITLE=${TITLE}`),
    setNoticeImg2: (data: any) => callApi("post", "/auth/setNoticeImg2/", data),
    setNotice2: (data: any) => callApi("post", "/auth/setNotice2/", data),
    updateNotice: (data: any) => callApi("post", "/auth/updateNotice/", data),
    updateNoticeImg: (data: any) => callApi("post", "/auth/updateNoticeImg/", data),
    getAllSchedules: (
        STORE_SEQ: string,
        YEAR: string,
        MONTH: string,
    ) => oldApi("get", `/Store/getAllSchedules?STORE_SEQ=${STORE_SEQ}&YEAR=${YEAR}&MONTH=${MONTH}`),
    cancelScheduleVacation: (data: any) => callApi("post", "/Management/cancelScheduleVacation/", data),
    getScheduleRestTImeUpdate: (data: any) => oldApi("post", "/Management/schedule_Rest_TIme_update/", data),
    getScheduleRestTImeCreate: (data: any) => oldApi("post", "/Management/schedule_Rest_TIme_create/", data),
    getEmpAnnual: (EMP_SEQ: string, YEAR: string) => oldApi("get", `/Employee/getEmpAnnual?EMP_SEQ=${EMP_SEQ}&YEAR=${YEAR}`),
    createScheduleVacation2: (data: any) => oldApi("post", '/Management/createScheduleVacation2', data),
    deleteSchedule: (data: any) => callApi("post", "/auth/deleteschedule/", data),
    createNewSchedule: (data: any) => oldApi("post", '/Management/new_schedule_create', data),
    createSchedule: (data: any) => oldApi("post", '/Management/schedule_create', data),
    updateSchedule: (data: any) => oldApi("post", '/Management/update', data),
    updateEmpSchedule: (data: any) => oldApi("post", '/Employee/update_emp_schedules3', data),
    insertEmpSchedule: (data: any) => oldApi("post", '/Employee/insert_emp_schedules', data),
    setEmpType: (EMP_SEQ: string) => oldApi("get", `/Employee/setEmpType?EMP_SEQ=${EMP_SEQ}`),
}
