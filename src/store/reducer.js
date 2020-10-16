import { combineReducers } from "redux";
import generalReducer from "./generalSlice";
import loginReducer from "../pages/Login/loginSlice";
import registerReducer from "../pages/Register/registerSlice";
import uiReducer from "./UISlice";

export default combineReducers({
  general: generalReducer,
  login: loginReducer,
  register: registerReducer,
  UI: uiReducer,
});
