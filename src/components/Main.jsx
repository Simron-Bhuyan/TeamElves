// import React from 'react';

// class Main extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       CompareURL: '',
//     };

//     this.handleUploadCompare = this.handleUploadCompare.bind(this);
//   }

//   handleUploadCompare(ev) {
//     ev.preventDefault();

//     const data = new FormData();
//     data.append('file', this.uploadInput.files[0]);
//     data.append('filename', this.fileName.value);

//     fetch('http://127.0.0.1:6000/upload', {
//       method: 'POST',
//       body: data,
//     }).then((response) => {
//       console.log(response)
//     });
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleUploadCompare}>
//         <div>
//           <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
//         </div>
//         <div>
//           <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
//         </div>
//         <br />
//         <div>
//           <button>Upload</button>
//         </div>
//         <img src={this.state.CompareURL} alt="files" />
//       </form>
//     );
//   }
// }

// export default Main;

import { useState, useRef } from 'react'
import axios from "axios"

function Form() {
    const [myFile, setFile] = useState('')
    const fileInput = useRef();
    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submit')
        console.log(fileInput)
        const data = new FormData();
        data.append('file', myFile);
        await axios.post('http://127.0.0.1:8000/upload', data)
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }
    return (
        <form >
            <div>
                <input ref={fileInput} type="file" onChange={handleChange}/>
            </div>
            <br />
            <div>
                <button onClick={handleSubmit}>Upload</button>
            </div>
        </form>
    )
}

export default Form