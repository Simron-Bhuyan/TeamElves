import React, { useState , useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BACKEND_URL } from "../URLConfig";

const Result = () => {
  const [darkMode, toggleDarkMode] = useState(false);
  const [result, setResult] = useState([]);
  useEffect(() => {
    var data = localStorage.getItem("result");
    setResult(JSON.parse(data));
  },[]);
  const results = [
    {
      fileName: "file1.java",
      percentage: 50,
    },
    {
      fileName: "file1.java",
      percentage: 50,
    },
    {
      fileName: "file1.java",
      percentage: 50,
    },
    {
      fileName: "file1.java",
      percentage: 50,
    },
    {
      fileName: "file1.java",
      percentage: 50,
    },
  ];
  return (
    <div>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="w-screen min-h-[70vh] mt-9">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Result</h1>
          <div className="resultContainer my-6">
            {results.map((result) => (<div className="resultBar flex w-96 border-2 rounded-lg border-[#a74b94] p-4 justify-between my-2">
              <div className="filename">
                <p className="text-lg">File Name</p>
              </div>
              <div className="percentage">
                <p className="font-bold"><span>96%</span>&nbsp;<span className="font-normal">Match</span></p>
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
