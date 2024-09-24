import { combineReducers } from "redux";
import userReducer from "./user/userSlice";
import popupReducer from "./popups/popupSlice";
import accountReducer from "./accounts/accountSlice";

const appReducer = combineReducers({
    user: userReducer,
    popup: popupReducer,
    accounts: accountReducer
})

const rootReducer = (state, action) => {
    if(action.type === 'LOGOUT') state = undefined;
    return appReducer(state, action);
}

export default rootReducer;