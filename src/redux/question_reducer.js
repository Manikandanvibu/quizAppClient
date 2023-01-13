import { createSlice } from "@reduxjs/toolkit"


// createing reducer with intial value
export const questionReducer = createSlice({
    name : 'questions',
    initialState : {
        // store questions and answers
        queue :[],
        answers : [],
        // trace is used to track user questions if user click next it increase trace value to 1
        trace : 0
    },
    // reducers allows you to specfiy and despatch an action and action allows you to change the value of store 
    reducers : {
        // using the action you can acces the user input
        // inside state you have cuurent state
        startExamAction : (state,action) => {
            let {question,answers} =action.payload
            return{
                // update intial state
                ...state,
                queue : question,
                answers : answers
            }
        },
        moveNextAction : (state) =>{
            return{
                ...state,
                trace : state.trace +1
            }
        },
        movePrevAction : (state) =>{
            return{
                ...state,
                trace : state.trace - 1
            }
        },
        resetAllAction : () =>{
            return{
                queue :[],
                answers : [],
                trace : 0 
            } 
        } 

    }
})

export const {startExamAction, moveNextAction,movePrevAction,resetAllAction} = questionReducer.actions;

export default questionReducer.reducer;