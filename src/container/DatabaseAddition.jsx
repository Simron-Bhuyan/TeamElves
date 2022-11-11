import React, { useState ,useEffect} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from '../components/Spinner'
import { BACKEND_URL } from "../URLConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const removeSpaces = (str) => {
  return str.replace(/\s/g, "");
}

const DatabaseAddition = (props) => {
  const [darkMode, toggleDarkMode] = useState(false);
  const [repoName, setRepoName] = useState("");
  const [loading, setLoading] = useState(false);
  const postRepoName = () => {
    setRepoName(removeSpaces(repoName));
    if (repoName === "") {
      return toast.error("Please Enter Repo name", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: `${darkMode ? "dark" : "light"}`,
      });
    }
    setLoading(true);
    fetch(`${BACKEND_URL}/github`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        repo: repoName,
      }),
    })
      .then((res) => {
        console.log(res);
        res.json();
        setLoading(false);
        setRepoName("");
        toast.success("Successfully Added to Database !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: `${darkMode ? "dark" : "light"}`,
        });
      })
      .then((data) => {
        console.log(data);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      loading(false);
    }, 3000);
  }, []);
  return (
    <div className={`w-[100vw] ${darkMode ? "dark" : "light"}`} >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="page h-[75vh] mx-10  flex justify-center items-center">
        <div
          className={`w-[90vw] sm:w-[60vw] flex-column space-y-2 ${
            loading ? "hidden" : "block"
          }`}
        >
          <h3 className="font-bold text-2xl">
            Add New Repository to the database
          </h3>
          <p>
            Enter a Repository name in the format username/reponame to add it to
            the database
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
        <div
          className={`w-[100vw] flex justify-center ${
            loading ? "block" : "hidden"
          }`}
        >
        <Spinner />
        </div>
      </div>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
};

export default DatabaseAddition;
