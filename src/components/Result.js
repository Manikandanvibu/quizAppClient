import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../styles/Result.css'
import ResultTable from "./ResultTable";

// import actions
import {resetAllAction} from '../redux/question_reducer'
import {resetResultAction} from '../redux/result_reducer'
import { attemps_Number, earnPoints_Number,flagResult } from "../helper/helper";
import { usePublishResult } from "../hooks/setResult";


export default function Result(){

  const dispatch = useDispatch()
  const {questions : {queue,answers}, result : {result, userId}} = useSelector(state => state)

  

  const totalPoints = queue.length * 10
  const attempts = attemps_Number(result)
  const earnPoints=earnPoints_Number(result,answers,10)
  // for checking pass or fail
  const flag = flagResult(totalPoints, earnPoints)

  // store user result 
usePublishResult({result,username : userId,attempts,points : earnPoints,achived : flag ? "Passed" : "Failed"})

  function onRestart(){
    dispatch(resetAllAction())
    dispatch(resetResultAction())
  }

  return(
    <div className="container">
      <h1 className="title text-light">Quiz App
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
        <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
        </svg>
      </h1>

      <div className="result flex-center">
      <div className="flex">
          <span>Username</span>
          <span className="bold">{userId}</span>
        </div>
        <div className="flex">
          <span>Total Quiz Points : </span>
          <span className="bold">{totalPoints || 0}</span>
        </div>
        <div className="flex">
          <span>Total Questions : </span>
          <span className="bold">{ queue.length || 0}</span>
        </div>
        <div className="flex">
          <span>Total Attempts</span>
          <span className="bold">{attempts || 0}</span>
        </div>
        <div className="flex">
          <span>Total Earn Points : </span>
          <span className="bold">{earnPoints || 0}</span>
        </div>
        <div className="flex">
          <span>Quiz Result</span>
          <span style={{color : `${flag ? "#2aff95" : "#ff2a66" }`}} className="bold">{flag ? "Passed" :"Failed"}</span>
        </div>
      </div>

      <div className="start">
        <Link className="btn" to={'/'} onClick={()=>onRestart()}>Restart</Link>
      </div>

      <div className="container">
        {/* Result Table */}
        <ResultTable></ResultTable>
      </div>
    </div> 
  )
}