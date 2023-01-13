import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import {MoveNextQuestion, MovePrevQuestion} from '../hooks/FetchQuestion'
import{PushAnswer} from '../hooks/setResult'

// redux store import
import {useSelector,useDispatch} from 'react-redux'

import { Navigate } from "react-router-dom";

export default function Quiz(){

  const [check, setChecked] = useState(undefined)

  const result =useSelector(state => state.result.result)
  // const trace = useSelector(state => state.questions.trace)
  const {queue, trace} = useSelector(state => state.questions)

  const dispatch = useDispatch()

  // next button event handler
  function onNext(){
    // console.log('On Next Click');
    if(trace < queue.length){
      // update the trace value by one using movenextaction()
      dispatch(MoveNextQuestion())

      // insert  the new element in array
      if(result.length <= trace){
        dispatch(PushAnswer(check))
      }
    }
    // reset the value of checked variable
    setChecked(undefined)
  }
  // prev button event handler
  function onPrev(){
    if(trace > 0){
      // update the trace value by one using movePrevaction()
      dispatch(MovePrevQuestion())
    }
  }

  function onChecked(check){
    setChecked(check)
  }

  // finished exam after the last question
  if(result.length && result.length >= queue.length){
    return <Navigate to={'/result'} replace="true"></Navigate>
  }
  return(
    <div className="container">
     <h1 className="title text-light">Quiz App
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
        <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
        </svg>
      </h1>

      {/* display questions */}
      <Questions onChecked={onChecked}/>
    
      
      <div className='grid'>
        {trace > 0 ? <button className="btn prev" onClick={onPrev}>Prev</button> : <div></div>}
        <button className="btn next" onClick={onNext}>Next</button>
      </div>
    </div> 
  )
}