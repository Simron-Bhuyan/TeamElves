import React, { useState, Fragment, Component } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
    console.log(code);
    setIsLoading(true);
    const jsonContent = {
      code: code,
    };
    fetch(`${BACKEND_URL}/code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonContent),
    })
      .then((res) => {
        res.json();
        console.log(res);
        setIsLoading(false);
        navigate("/result");
      })
      .then((data) => {
        console.log(data);
        setIsLoading(false);
      });
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    const formData = new FormData();
    formData.append("file", fileUploaded);
    axios
      .post(`${BACKEND_URL}/upload`, formData)
      .then((res) => {
        console.log(res);
        localStorage.setItem("result", res.data);
        navigate("/resultPage");
      })
      .catch((err) => {
        console.log(err);
      });
    props.handleFile(fileUploaded);
  };

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
          {/* <div
            className={`m-3 ${
              isUploaded ? "block" : "hidden"
            } flex justify-center`}
          >
            <div className="fileName m-2 border-black border 2 px-10 py-5 rounded-sm flex">
              <div>FileName isUploaded</div>
              <div className="ml-6">
                <button>X</button>
              </div>
            </div>
          </div> */}
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
        <div className={` ${isLoading ? "flex" : "hidden"} justify-center items-center`}>
          <div>
            <h3 className="text-2xl font-bold">Loading...</h3>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditorPage;