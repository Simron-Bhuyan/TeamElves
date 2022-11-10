import React, { useState , useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BACKEND_URL } from "../URLConfig";

const Result = (props) => {
  const [darkMode, toggleDarkMode] = useState(false);
  const [results, setResults] = useState([]);
  useEffect(() => {
    var data = localStorage.getItem("result");
    setResults(JSON.parse(data));
  },[]);
  console.log(results);
  return (
    <div className={`w-[100vw] ${darkMode ? "dark" : "light"}`} >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="min-h-[70vh] mt-9 flex justify-center w-[95vw]">
        <div className="flex flex-col items-center justify-center w-[80vw] overflow-x-hidden">
          <h1 className="text-3xl font-bold">Result</h1>
          <div className="resultContainer my-6">
            {results.map((result) => (<div className="resultBar flex w-96 border-2 rounded-lg border-[#a74b94] p-4 justify-between my-2">
              <div className="filename">
                <p className="text-lg">{result[0]}</p>
              </div>
              <div className="percentage">
                <p className="font-bold"><span>{result[1]}%</span>&nbsp;<span className="font-normal">Match</span></p>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Result;
