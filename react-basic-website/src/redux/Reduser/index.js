import { combineReducers } from "redux";
import { booleanReducer } from "../Reduser/BooleanReducer";
const reducers = combineReducers({
  allBool: booleanReducer,
});
export default reducers;
