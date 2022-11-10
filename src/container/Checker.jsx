import React,{useState,useEffect} from 'react'
import FileInput from '../components/FileInput'
import axios from "axios";
import Main from "../components/Main";
function Checker(props) {
 

   
  return (
    <div className="">
   {props.file}
   {props.per}
   <Main/>
    </div>
  )
}

export default Checker