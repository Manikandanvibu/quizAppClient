//  fetch question hook to fetch api data and set value to store

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getServerData } from "../helper/helper"


// redux action
import * as Action from '../redux/question_reducer'

/** fetch question hook to fetch api data and set value to store */
export const useFetchQuestion = () =>{
    const dispatch =  useDispatch()
    const [getData, setGetData] = useState({isLoading : false, apiData : [], serverError : null})

    useEffect(() => {
        setGetData(prev => ({...prev, isLoading : true}));

        // async function fetch backend data
        (async () => {
            try{
                const [{questions, answers}] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,(data) => data)
                

                if(questions.length > 0){
                    setGetData(prev => ({...prev, isLoading : false}));
                    setGetData(prev => ({...prev, apiData : {questions}}));

                    // dispatch an action
                     dispatch(Action.startExamAction({question : questions,answers}))
                }
                else{
                    throw new Error('NO Question Available')
                }
            }
            catch(error){
                setGetData(prev => ({...prev, isLoading : false}))
                setGetData(prev => ({...prev, serverError : error}))
            }
        })();

    },[dispatch]);

    return [getData,setGetData];
}

// move action dispatch function
export const MoveNextQuestion = () => async (dispatch) =>{
    try{
        // icrease trace value by 1
        dispatch(Action.moveNextAction())   
    }
    catch(error){
        console.log(error);
    }
}

// prev action dispatch function
export const MovePrevQuestion = () => async (dispatch) =>{
    try{
        // decrease trace value by 1
        dispatch(Action.movePrevAction())
    }
    catch(error){
        console.log(error);
    }
}