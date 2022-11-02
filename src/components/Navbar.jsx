import React from 'react'
import { BsFillSunFill, BsMoonStarsFill } from 'react-icons/bs'

function Navbar(props) {
  return (
    <nav className="bg-[#a74b94] h-[max-content] py-4 px-2 t-0 grid grid-cols-2 place-content-between items-center w-full overflow-x-hidden">
      <h4>home</h4>
      {/* <img onClick={props.toggleDarkMode} 
              className="self-left justify-self-end" 
              src={props.darkMode ? "./assets/toggle-icon-dark.svg" : "./assets/toggle-icon-dark.svg"}  />*/}
      <div onClick={() => props.toggleDarkMode(!props.darkMode)} className="self-left justify-self-end">
        {
          props.darkMode ? <BsFillSunFill style={{color:"white",fontSize:"1.5rem",cursor: "pointer"}}/> : <BsMoonStarsFill style={{color:"black",fontSize:"1.5rem",cursor: "pointer"}}/>
        }
      </div>

    </nav>
  )
}

export default Navbar