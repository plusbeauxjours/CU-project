import { combineReducers } from "redux";
import userReducer from "./userSlice";
import alertReducer from "./alertSlice";
import splashReducer from "./splashSlice";

export default combineReducers({
    userReducer,
    alertReducer,
    splashReducer
});