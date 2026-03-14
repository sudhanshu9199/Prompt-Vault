import style from './App.module.scss';
import { useEffect, useState, Suspense } from "react";
import VideoLoader from "../components/common/videoLoader/VideoLoader"
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from 'react-router';

const App = () => {
  const [showLoader, setshowLoader] = useState(true);

  const handleLoaderFinished = () => {
    setshowLoader(false);
  };
  return (
    <div className={style.app}>
      <Navbar />
      <main className={style.content}>
        <Suspense>
          <Outlet />
        </Suspense>
      </main>
      {/* { showLoader && <VideoLoader onFinished = {handleLoaderFinished} />} */}
    </div>
  )
}

export default App