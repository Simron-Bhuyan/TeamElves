import React from "react";
import YoutubeEmbed from "./Youtube";
function About() {
  return (
    <div className=" flex-row-reverse md:flex md:mt-40 p-5" id="about">
      <div className=" flex items-center p-5">
        <div>
          <h3 className="font-bold text-3xl text-center">
            Detect it with Detecto
          </h3>
          <p className="text-lg text-center">
            Detecto allows you to investigate any suspicious cases of code plagiarism,
            allowing you to conclude with certainty if portion of code is
            copied.  
          </p>
        </div>
      </div>
      <div className="flex h-[max-content] w-[100vw]  p-5">
        <YoutubeEmbed embedId="p0rrYiZOAwQ" />
      </div>
    </div>
  );
}

export default About;
