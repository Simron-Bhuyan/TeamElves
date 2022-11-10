import { useState, useRef } from 'react'
import axios from "axios"

function Form() {
    const fileInput = useRef();
    const handleSubmit =  async (e) => {
        e.preventDefault();
        console.log('submit')
        const data = new FormData();
        data.append('file', fileInput.files[0]);
        await axios.post('http://127.0.0.1:8000/upload', data)
            .then(res => console.log(res))
            .catch(err => console.error(err))
    }
    return (
        <form onSubmit={(e) => e.preventDefault}>
            <div>
                <input ref={fileInput} type="file" />
            </div>
            <br />
            <div>
                <button onClick={handleSubmit}>Upload</button>
            </div>
        </form>
    )
}

export default Form