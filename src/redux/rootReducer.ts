import { combineReducers } from "redux";
import userReducer from "./userSlice";
import userAlarmReducer from "./userAlarmSlice";
import alertReducer from "./alertSlice";
import splashReducer from "./splashSlice";
import helpReducer from "./helpSlice";

export default combineReducers({
    userReducer,
    userAlarmReducer,
    alertReducer,
    splashReducer,
    helpReducer,
});