import React from 'react'
import '../Stylesheets/Colours.css'
import { BsFillSunFill, BsMoonStarsFill, BsBoxArrowInUpRight } from 'react-icons/bs'

function Navbar(props) {
  return (
    <nav className="relative w-full flex flex-wrap items-center justify-between py-4 bg-purple navbar navbar-expand-lg navbar-light">
      <div className="container-fluid w-full flex flex-wrap items-center sm:justify-around md:justify-between px-6">
      <div className="flex flex-wrap ">
        <h1 className={props.darkMode ? "text-neutral-900 font-semibold text-lg" : "text-stone-50 font-semibold text-lg"} >
        <a className="flex items-center h-[28px] my-2 mx-24 mb-4 md:my-0 md:ml-2">
                <img src="https://user-images.githubusercontent.com/89746011/199548760-e3011cf6-27cb-4a12-aebb-af1faf352175.png" className="h-[8em]" alt="Detecto Logo" />
            </a>
        </h1>
      </div>
      <div className={props.darkMode ? "text-neutral-900 grid grid-cols-4 place-content-between justify-self-end mr-4" : "text-stone-50 grid grid-cols-4 place-content-between justify-self-end mr-4"}>
        <div className="self-left justify-self-center px-2 cursor-pointer">About</div>
        <a className="flex self-left justify-self-center px-2 cursor-pointer" href="https://github.com/Simron-Bhuyan/TeamElves">Github <BsBoxArrowInUpRight className="ustify-self-center" /></a>
        <div className="self-left justify-self-center px-2 cursor-pointer">Team</div>
        <div onClick={() => props.toggleDarkMode(!props.darkMode)} className="self-left justify-self-end">
          {
            props.darkMode ? <BsFillSunFill style={{ color: "white", fontSize: "1.5rem", cursor: "pointer" }} /> : <BsMoonStarsFill style={{ color: "black", fontSize: "1.5rem", cursor: "pointer" }} />
          }
        </div>
      </div>
      </div>
    </nav>
  )
}

export default Navbar