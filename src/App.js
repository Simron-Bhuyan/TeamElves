import Home from './container/Home';
import React from 'react';
import { memo } from "react";
import { Routes, Route } from "react-router-dom";
import EditorPage from './container/EditorPage';
import DatabaseAddition from './container/DatabaseAddition';
import ResultPage from './container/ResultPage';
const App = () => {
  return (
    <Routes>
        <Route path={"/*"} element={<Home />} />
        <Route path={"/plagiarism-checker"} element={<EditorPage/>} />
        <Route path={"/databaseAddition"} element={<DatabaseAddition/>} />
        <Route path={"/result"} element={<ResultPage/>} />
      </Routes>
  )
}

export default memo(App);