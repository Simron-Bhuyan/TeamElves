import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUpload } from "react-icons/fa";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import Editor from "../components/Editor";

const EditorPage = (props) => {
  const [darkMode, toggleDarkMode] = useState(true);
  const [result, setResult] = useState(true);
  // Create a reference to the hidden file input element
  const hiddenFileInput = React.useRef(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    await axios.post('/upload', formData).then(res => console.log(res))
      .catch(err => console.log(err))
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded)
    props.handleFile(fileUploaded);
  };
  return (
    <div className={`w-[100vw] ${darkMode ? "dark" : "light"}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* <WithLineNumbers /> */}
      <div>
        <h3 className="font-bold text-2xl text-center mt-4 mb-2">
          Code Editor
        </h3>
        <p className="text-lg mb-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
          repudiandae omnis enim maxime vero qui, dolores error odit tempore
          maiores quam tempora magni nesciunt sapiente exercitationem ab
          perspiciatis esse quidem vel quasi corrupti nam. Magni id impedit
          ipsam vero earum. Perferendis nostrum modi hic eligendi eius autem et
          delectus illum.
        </p>
      </div>
      <div className=" flex justify-center min-h-[45vh]">
        <div className="leftEditor w-[50%]">
          <div className="m-3 shadow-md shadow-slate-600">
            <Editor />
          </div>
          <form action="http://127.0.0.1:6000/upload" method="POST"
            enctype="multipart/form-data" className="buttonContainer mb-10 space-x-4 flex justify-center">
            <button className="px-4 py-1 rounded-md border-2 border-[#a74b94] hover:bg-[#a74b94] hover:text-white duration-150 text-lg" onClick={handleSubmit}>Submit
            </button>
            <button
              className="px-4 py-1 rounded-md border-2 border-[#a74b94] hover:bg-[#a74b94] hover:text-white duration-150 text-lg flex items-center"
              onClick={handleClick}
            >
              Upload file
              <FaUpload className="text-lg mx-1 " />
            </button>
            <input name="selectedFile"
              id="file"
              type="file"
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
          </form>


        </div>
        <div className={`rightOutput w-[50%] ${result ? "flex" : "hidden"}`}>
          <div>
            <h3 className="items-center">RESULT</h3>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditorPage;
