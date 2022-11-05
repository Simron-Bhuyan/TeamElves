import React from 'react'
import YoutubeEmbed from './Youtube'
function About() {
  return (
    <div className="flex sm:flex-wrap flex-row mt-40">
      <div className="flex h-[max-content] w-[60vw]  p-5">
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