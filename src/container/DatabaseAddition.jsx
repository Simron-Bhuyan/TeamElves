import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const DatabaseAddition = () => {
  const [darkMode, toggleDarkMode] = useState(false);
  const [repoName, setRepoName] = useState("");
  const [loading, setLoading] = useState(false);
  const postRepoName = () => {
    setLoading(true);
    fetch("http://localhost:3001/api/addRepo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        repoName: repoName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return (
    <div>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="page h-[75vh] mx-10  flex justify-center items-center">
        <div className={`w-[90vw] sm:w-[60vw] flex-column space-y-2 ${loading?"hidden":"block"}`}>
          <h3 className="font-bold text-2xl" >Add New Repository to the database</h3>
          <p>
            Enter a Repository name in the format username/reponame to add it to the database
          </p>
          <div>
            <div className="flex space-x-4 mt-4">
              <input
                type="text"
                placeholder="amanroy/project1"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#a74b94] focus:outline-none"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
              />
              <button
                className="flex items-center ml-2 px-4 py-2 bg-[#f5f5f5] border-solid border-[0.5px] border-[#a74b94] rounded-3xl font-bold text-[#a74b94] hover:bg-[#a74b94] hover:text-white duration-300"
                onClick={postRepoName}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className={`w-[90vw] sm:w-[60vw] flex justify-center ${loading?"block":"hidden"}`}>
            <h3 className="font-bold text-2xl text-center" >Adding Repository to Database ...</h3>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DatabaseAddition;
