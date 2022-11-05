import React from "react";
import YoutubeEmbed from "./Youtube";
function About() {
  return (
    <div className=" flex-row-reverse md:flex mt-40">
      <div className=" flex items-center p-5">
        <div>
          <h3 className="font-bold text-3xl text-center">LOREM</h3>
          <p className="text-lg text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
            repellat fugiat sit minus, dignissimos, corrupti nisi fugit
            explicabo modi obcaecati voluptates aut accusantium totam accusamus
            quae, consequuntur dolore quo earum? Eum nemo nulla omnis
            recusandae.
          </p>
        </div>
      </div>
      <div className="flex h-[max-content] w-[100vw]  p-5">
        <YoutubeEmbed embedId="rokGy0huYEA" />
      </div>
    </div>
  );
}

export default About;
