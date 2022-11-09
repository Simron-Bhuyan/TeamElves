import Home from './container/Home';
import React,{useState,useEffect} from 'react';
import Checker from './container/Checker';
import { memo } from "react";
import { Routes, Route } from "react-router-dom";
import EditorPage from './container/EditorPage';
const App = () => {
  const [data, setdata] = useState({
    File: '',
    Percentage: 10,
});
  // Using useEffect for single rendering
  useEffect(() => {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("/plagiarism").then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            setdata({
                File: data.File,
                Percentage: data.Percentage,
            });
        })
    );
}, []);
  return (
    <Routes>
    <Route path={"/*"} element={<Home />} />
    <Route path={"/plagiarism-checker"} element={<EditorPage/>} />
    <Route path={"/checker"} element={<Checker file={data.File} per={data.Percentage}/>} />
  </Routes>   
  )
}

export default memo(App);