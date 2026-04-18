import {createSlice} from '@reduxjs/toolkit';

const initialState={
    issues:localStorage.getItem("issues")?JSON.parse(localStorage.getItem("issues")):[],
};

const issueSlice=createSlice({
    name: "issue",
    initialState:initialState,
    reducers:{
        setIssues(state,value){
            state.issues=value.payload;
        }
    },
});

export const{setIssues}= issueSlice.actions;

export default issueSlice.reducer;