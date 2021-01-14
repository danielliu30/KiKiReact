import { combineReducers } from "redux";
import token from "./JWTSlice";
import cardContent from "./CartSlice";
import profile from "./ProfileSlice";
const allReducers = combineReducers({
  token,
  cardContent,
  profile,
});

export default allReducers;
