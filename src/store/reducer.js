import { combineReducers } from "redux";
import generalReducer from "./generalSlice";
import loginReducer from "../pages/Login/loginSlice";
import registerReducer from "../pages/Register/registerSlice";
import uiReducer from "./UISlice";
import filterReducer from "../pages/Strangers/Filter/filterSlice";

export default combineReducers({
  general: generalReducer,
  login: loginReducer,
  register: registerReducer,
  UI: uiReducer,
  filter: filterReducer,
});
