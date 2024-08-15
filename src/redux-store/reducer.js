import { combineReducers } from "redux";
import userReducer from "./user/userSlice";
import popupReducer from "./popups/popupSlice";

const appReducer = combineReducers({
    user: userReducer,
    popup: popupReducer
})

const rootReducer = (state, action) => {
    if(action.type === 'LOGOUT') state = undefined;
    return appReducer(state, action);
}

export default rootReducer;