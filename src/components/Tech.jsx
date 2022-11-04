import React from 'react'

function Tech() {
  return (
    <div className="language w-[100vw] h-[40vh] bg-[#f5d7f5] mt-40">
        <h3 className="font-semibold text-3xl text-center p-10">
          Supports 3 Languages
        </h3>
        <div class="grid grid-cols-3 gap-4 justify-items-center">
          <div>
            <a>
            <img src="https://img.icons8.com/ios-filled/50/null/circled-c.png"/>
            </a>
          </div>
          <div>
          <a>
            <img src="https://img.icons8.com/ios-filled/50/null/c-plus-plus-logo.png"/>
            </a>
          </div>
          <div>
          <a>
            <img src="https://img.icons8.com/ios-filled/50/null/python.png"/>
            </a>
          </div>
        </div>
      </div>
  )
}

export default Tech