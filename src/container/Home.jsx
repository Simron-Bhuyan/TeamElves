import React, { useState, useEffect } from 'react'
import Spinner from '../components/Spinner'
import Navbar from '../components/Navbar'
import IntroPage from '../components/IntroPage'
import About from '../components/About'
import Tech from '../components/Tech'
import Contributors from '../components/Contributors'
import Footer from '../components/Footer'
function Home() {
  const [darkMode, toggleDarkMode] = useState(true)
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
        <IntroPage />
        <About />
        <Tech />
        <Contributors />
        <Footer />
      </div>)}

  </>
  );
}

export default Home;
