import React from 'react'

function IntroPage() {
  return (
    <div className="hero h-[90vh] flex w-[100vw]">
        <div className="heroLeft flex w-[55%] h-[100%] justify-center items-center p-20 pr-32">
          <div>
            <h3 className="font-bold text-6xl mb-4">DETECTO</h3>
            <p className="text-lg font-medium mb-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              voluptatum voluptate illo, delectus officia obcaecati unde
              nesciunt magnam a neque, nihil non impedit. Deserunt, quas. Natus
              eos nemo culpa explicabo.
            </p>
            <button className="px-4 py-2 bg-[#a74b94] rounded-3xl text-white">
              Read More
            </button>
            <button className="ml-2 px-4 py-2 bg-[#f5f5f5] border-solid border-[0.5px] border-[#a74b94] rounded-3xl font-bold text-[#a74b94]">
              Get Started...
            </button>
          </div>
        </div>
        <div className="heroRight bg-[#f5d7f5] w-[45%] relative">
          <div className="w-[100%] h-[100%] absolute top-11 right-14 bg-[#a74b94]"></div>
        </div>
      </div>
  )
}

export default IntroPage