import React from 'react'
import {Link} from 'react-router-dom'
import {BiFastForward} from 'react-icons/bi'
function IntroPage() {
  return (
    <div className="hero md:h-[90vh] w-[100vw] md:flex">
        <div className="heroLeft flex h-[50vh] md:w-[55%] md:h-[100%] justify-center items-center p-7 md:p-20 md:pr-32">
          <div>
            <h3 className="font-bold text-6xl mb-4 text-center md:text-left ">DETECTO</h3>
            <p className="text-lg font-medium mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              voluptatum voluptate illo, delectus officia obcaecati unde
              nesciunt magnam a neque, nihil non impedit. Deserunt, quas. Natus
              eos nemo culpa explicabo.
            </p>
            <div className='flex justify-center md:justify-start'>
            <button className="px-4 py-2 bg-[#a74b94] rounded-3xl text-white">
              Read More
            </button>
            <Link to='/plagiarism-checker'>
            <button className="flex items-center ml-2 px-4 py-2 bg-[#f5f5f5] border-solid border-[0.5px] border-[#a74b94] rounded-3xl font-bold text-[#a74b94]" >
              Get Started
              <BiFastForward className='text-3xl' />
            </button>
            </Link>
            </div>
          </div>
        </div>
        <div className="heroRight hidden md:block bg-[#f5d7f5] md:w-[45%] md:relative">
          <div className="md:w-[100%] md:h-[100%] md:absolute md:top-11 md:right-14 bg-[#a74b94]"></div>
        </div>
        <div className='md:hidden w-[100vw] bg-[#a74b94] p-5'>
        <p>lorem</p>
        </div>
      </div>
  )
}

export default IntroPage