import weatherReducer from "./weatherReducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    weatherReducer,
});

export default rootReducer;