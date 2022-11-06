import React, { useState } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaUpload } from "react-icons/fa";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import Editor from "../components/Editor";
import WithLineNumbers from "../components/WithLineNumbers";

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

  var jsonContent={
    'code':`
    #User function heyalate for python3
class Solution:
    def constructLowerArray(self,arr, n):
        # code here
        def merge(a,b):
            i,j=0,0
            x,y=len(a),len(b)
            while i<x:
                a[i][1]+=j
                while j<y and a[i][0]>b[j][0]:
                    j+=1
                    a[i][1]+=1
                i+=1
            i,j=0,0
            heya=[]
            while i<x and j<y:
                if a[i][0]>b[j][0]:
                    heya.append(b[j])
                    j+=1
                else:
                    heya.append(a[i])
                    i+=1
            while i<x:
                heya.append(a[i])
                i+=1
            while j<y:
                heya.append(b[j])
                j+=1
            return heya
        def mergesort(a):
            x=len(a)
            if x<2:
                return a
            else:
                mid=x//2
                return merge(mergesort(a[:mid]),mergesort(a[mid:]))
        a=[[arr[i],0,i] for i in range(len(arr))]
        ans=mergesort(a)
        ans.sort(key=lambda x: x[2])
        return list([ans[i][1] for i in range(len(ans))])





#{ 
 # Driver Code Starts
#Initial heyalate for Python 3




# } Driver Code Ends
    `
  }
  
    const handleSubmit = (e) => {
      fetch('http://localhost:5000/api', {
        method: 'POST',
        body: JSON.stringify(jsonContent),
      })
      };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
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
          <div className="buttonContainer mb-10 space-x-4 flex justify-center">
            <button className="px-4 py-1 rounded-md border-2 border-[#a74b94] hover:bg-[#a74b94] hover:text-white duration-150 text-lg" onClick={handleSubmit}>
            <a href="http://localhost:5000/test">
              Submit
              </a>
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
