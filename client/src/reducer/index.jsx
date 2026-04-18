
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/auth";
import issueReducer from "../slices/issue"



const rootReducer= combineReducers({
    auth:authReducer,
    issue:issueReducer,
    
})

export default rootReducer;