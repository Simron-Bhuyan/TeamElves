import React, { useState, Fragment, Component,useEffect } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from '../components/Spinner'
import { FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import Editor from "react-simple-code-editor";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import WithLineNumbers from "../components/WithLineNumbers";
import { BACKEND_URL } from "../URLConfig";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Editor from "../components/Editor";

const exampleCode = `
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`;

const styles = {
  root: {
    fontFamily: '"Dank Mono", "Fira Code", monospace',
    ...theme.plain,
  },
};

const EditorPage = (props) => {
  const [darkMode, toggleDarkMode] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [code, setCode] = useState(exampleCode);
  const hiddenFileInput = React.useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const highlight = (code) => (
    <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>
  );

  const handleSubmit = (e) => {
    if (code === "") {
      return toast.error("Please Enter some code", {
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
    setIsLoading(true);
    const jsonContent = {
      code: code,
    };
    axios
      .post(`${BACKEND_URL}/code`, jsonContent)
      .then((res) => {
        console.log(res.data);
        setResults(res.data);
        setIsLoading(false);
        setIsResult(true);
        localStorage.setItem("result", JSON.stringify(res.data.res));
        navigate("/result");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", fileUploaded);
    axios
      .post(`${BACKEND_URL}/upload`, formData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("result", JSON.stringify(res.data.res));
        navigate("/result");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    props.handleFile(fileUploaded);
  };
  useEffect(() => {
    setTimeout(() => {
      isLoading(false);
    }, 3000);
  }, []);
  return (
    <div className={`w-[100vw] ${darkMode ? "dark" : "light"}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className={` flex justify-center min-h-[65vh] items-center `}>
        <div className={`leftEditor w-[50%] ${isLoading ? "hidden" : "block"}`}>
          <div
            className={`m-3 shadow-md shadow-slate-600 ${
              isUploaded ? "hidden" : "block"
            }`}
          >
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={highlight}
              padding={10}
              style={styles.root}
            />
          </div>
         
          <div className="buttonContainer mb-10 space-x-4 flex justify-center">
            <button
              className="px-4 py-1 rounded-md border-2 border-[#a74b94] hover:bg-[#a74b94] hover:text-white duration-150 text-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              className="px-4 py-1 rounded-md border-2 border-[#a74b94] hover:bg-[#a74b94] hover:text-white duration-150 text-lg flex items-center"
              onClick={handleClick}
            >
              Upload file
              <FaUpload className="text-lg mx-1 " />
            </button>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div
          className={` ${
            isLoading ? "flex" : "hidden"
          } justify-center items-center`}
        >
          <Spinner/>
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

export default EditorPage;