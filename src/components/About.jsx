import React from 'react'
import YoutubeEmbed from './Youtube'
function About() {
  return (
    <div className="flex mt-40">
      <div className="flex h-[max-content] w-[60vw]  p-5">
      <YoutubeEmbed embedId="rokGy0huYEA" />
      </div>
      <div className="Content flex p-5 items-center">
        <div>
          <h3 className='text-center font-bold text-4xl mb-5'>LOREM</h3>
          <p className='text-lg'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quo qui nesciunt vel, modi debitis. Vero, cum! Ipsum accusantium, dolorum deserunt facilis nisi eos. Corrupti dignissimos quia id quam veritatis deleniti dolore in reprehenderit minima.</p>
        </div>
      </div>
    </div>
  )
}

export default About