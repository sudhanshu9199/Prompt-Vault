import style from './App.module.scss';
import { useEffect, useState } from "react";
import VideoLoader from "../components/common/videoLoader/VideoLoader"
import Home from "../pages/Home/Home"
import Navbar from "../components/Navbar/Navbar";

const App = () => {
  const [showLoader, setshowLoader] = useState(true);

  const handleLoaderFinished = () => {
    setshowLoader(false);
  };
  return (
    <div className={style.app}>
      <Navbar />
      <main className={style.content}>
        <Home />
      </main>
      {/* { showLoader && <VideoLoader onFinished = {handleLoaderFinished} />} */}
    </div>
  )
}

export default App