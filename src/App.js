import Home from './container/Home';
import React from 'react';
import Checker from './container/Checker';
import { memo } from "react";
import { Routes, Route } from "react-router-dom";
import EditorPage from './container/EditorPage';
import DatabaseAddition from './container/DatabaseAddition';
import { Result } from 'postcss';
const App = () => {
  return (
    <Routes>
        <Route path={"/*"} element={<Home />} />
        <Route path={"/plagiarism-checker"} element={<EditorPage/>} />
        <Route path={"/databaseAddition"} element={<DatabaseAddition/>} />
        <Route path={"/result"} element={Result} />

      </Routes>
  )
}

export default memo(App);