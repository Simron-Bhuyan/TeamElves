import React,{useState,useEffect} from 'react'
import Spinner from '../components/Spinner'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
function Home() {
  const [darkMode,toggleDarkMode]=useState(true)
  const [isLoding, setIsLoding] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoding(false);
    }, 3999);
  }, []);
  return (<>
    {isLoding ? (
      <Spinner />
    ) : (
    <div className={`overflow-hidden ${darkMode ? "dark" : "light"}`}>
    <Navbar 
    darkMode={darkMode} 
    toggleDarkMode={toggleDarkMode} 
/>
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
            <button className="ml-5 px-4 py-2 rounded-3xl font-bold text-xl text-[#a74b94]">
              Get Started..
            </button>
          </div>
        </div>
        <div className="heroRight bg-[#f5d7f5] w-[45%] relative">
          <div className="w-[100%] h-[100%] absolute top-11 right-14 bg-[#a74b94]"></div>
        </div>
      </div>
      <div className="tutorial flex mt-40">
        <div className="Video flex h-[60vh] w-[100vw] bg-black"></div>
        <div className="Content flex ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          ad blanditiis eius nulla ea pariatur enim labore obcaecati, dolores
          accusantium dolorum, velit sunt nesciunt. At natus enim odit optio
          commodi.
        </div>
      </div>
      <div className="language w-[100vw] h-[40vh] bg-[#f5d7f5] mt-40">
        <h3 className="font-semibold text-3xl text-center p-10">
          Supports 10+ Languages
        </h3>
      </div>
      <div className="contributers mt-14">
        <h3 className="font-semibold text-3xl text-center p-10">
          CONTRIBUTERS
        </h3>
        <div className="container w-[100vw] flex-wrap justify-around flex">
        <div className="profile overflow-hidden m-14">
          <img
            src="https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="Profile"
            className="w-300 rounded-[100%]"
          />
          <h4 className="text-center mt-5">NAME</h4>
        </div>
        <div className="profile overflow-hidden m-14">
          <img
            src="https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="Profile"
            className="w-300 rounded-[100%]"
          />
          <h4 className="text-center mt-5">NAME</h4>
        </div>
        <div className="profile overflow-hidden m-14">
          <img
            src="https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="Profile"
            className="w-300 rounded-[100%]"
          />
          <h4 className="text-center mt-5">NAME</h4>
        </div>
        <div className="profile overflow-hidden m-14">
          <img
            src="https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="Profile"
            className="w-300 rounded-[100%]"
          />
          <h4 className="text-center mt-5">NAME</h4>
        </div>
        <div className="profile overflow-hidden m-14">
          <img
            src="https://images.unsplash.com/photo-1499482125586-91609c0b5fd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="Profile"
            className="w-300 rounded-[100%]"
          />
          <h4 className="text-center mt-5">NAME</h4>
        </div>

        </div>
      </div>
      <Footer />
    </div>)}
    
    </>
  );
}

export default Home;
