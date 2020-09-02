import { combineReducers } from "redux";
import userReducer from "./userSlice";
import storeReducer from "./storeSlice";
import userAlarmReducer from "./userAlarmSlice";
import alertReducer from "./alertSlice";
import splashReducer from "./splashSlice";
import helpReducer from "./helpSlice";
import mycuReducer from "./mycuSlice";
import healthReducer from "./healthSlice";
import employeeReducer from "./employeeSlice";

export default combineReducers({
    userReducer,
    storeReducer,
    userAlarmReducer,
    alertReducer,
    splashReducer,
    helpReducer,
    mycuReducer,
    healthReducer,
    employeeReducer,
});