import { combineReducers } from "redux";
import generalReducer from "./generalSlice";
import loginReducer from "../pages/Login/loginSlice";
import registerReducer from "../pages/Register/registerSlice";

export default combineReducers({
  general: generalReducer,
  login: loginReducer,
  register: registerReducer,
});
