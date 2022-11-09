import React,{useState,useEffect} from 'react'
import FileInput from '../components/FileInput'

function Checker(props) {

//   const uploadFile = async (e) => {
//     const file = e.target.files[0];
//     if (file != null) {
//         const data = new FormData();
//         data.append('file_from_react', file);
        
//         let response = await fetch('/url_route', { method: 'post', body: data, });

//         let res = await response.json();
//         if (res.status !== 1) {
//             alert('Error uploading file');
//         }
//     }
// };

  return (
    <div className="">
   {props.file}
   {props.per}

    </div>
  )
}

export default Checker