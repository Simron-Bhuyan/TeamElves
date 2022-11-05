import Home from './container/Home';
import React from 'react';
import Checker from './container/Checker';
import { memo } from "react";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
        <Route path={"/*"} element={<Home />} />
        <Route path={"/plagarism-checker"} element={<Checker/>} />
      </Routes>
  )
}

export default memo(App);