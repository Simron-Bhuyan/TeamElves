import React from "react";
import { Link } from "react-router-dom";
import { BiFastForward } from "react-icons/bi";
import HomePageVideo from "../assets/HomePageVideo.mp4";
function IntroPage() {
  return (
    <div className="hero md:h-[90vh] w-[100vw] md:flex">
      <div className="heroLeft flex h-[50vh] md:w-[55%] md:h-[100%] justify-center items-center p-7 md:p-20 md:pr-32">
        <div>
          <h3 className="font-bold text-6xl mb-4 text-center md:text-left ">
            DETECTO
          </h3>
          <h4 className="font-medium text-xl mb-4 text-center md:text-left ">
            OPEN SOURCE RISK-ASSESSMENT/CODE PLAGIARISM
          </h4>
          <p className="text-lg font-medium mb-5">
            Check the similarity of two source codes and view how much
            percentage matches.Investigate potential copied code by highlighting
            similarities from submitted peers.It is a smart way to ensure code
            originality, protect a developer's hardwork and prevent academic
            dishonesty.
          </p>
          <div className="flex justify-center md:justify-start">
            <Link to="/plagiarism-checker">
              <button className="flex items-center ml-2 px-4 py-2 bg-[#f5f5f5] border-solid border-[0.5px] border-[#a74b94] rounded-3xl font-bold text-[#a74b94] hover:bg-[#a74b94] hover:text-white duration-300">
                Get Started 
                <BiFastForward className="text-3xl" />
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="heroRight hidden md:block bg-[#f5d7f5] md:w-[45%] md:relative">
        <div className="md:w-[100%] md:h-[100%] md:absolute md:top-11 md:right-14 rounded-lg bg-[#a74b94] flex justify-center items-center p-20">
          <video autoPlay muted loop className="video rounded-lg">
            <source src={HomePageVideo} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="md:hidden w-[100vw] bg-[#a74b94] p-10 mt-24">
      <video autoPlay muted loop className="video rounded-lg">
            <source src={HomePageVideo} type="video/mp4" />
          </video>
      </div>
    </div>
  );
}

export default IntroPage;
