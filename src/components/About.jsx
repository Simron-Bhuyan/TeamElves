import React from 'react'
import YoutubeEmbed  from './Youtube'
function About() {
  return (
    <div className="tutorial flex flex-wrap mt-40">
        <div className="Video flex h-[60vh] w-[100vw]  m-2">
        <YoutubeEmbed embedId="rokGy0huYEA" />
        </div>
        <div className="Content flex ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          ad blanditiis eius nulla ea pariatur enim labore obcaecati, dolores
          accusantium dolorum, velit sunt nesciunt. At natus enim odit optio
          commodi.
        </div>
      </div>
  )
}

export default About