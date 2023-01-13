import { combineReducers,configureStore } from "@reduxjs/toolkit";


// call reducer
import  questionReducer  from "./question_reducer";
import  resultReducer  from "./result_reducer";

// questions and results are combined and store in rootReducer
const rootReducer=combineReducers({
    questions : questionReducer,
    result :resultReducer
})

// create stor with reducer
export default configureStore({reducer : rootReducer})