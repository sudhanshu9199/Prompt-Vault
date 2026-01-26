import { useEffect, useState } from "react";
import VideoLoader from "./components/common/videoLoader/VideoLoader"
import Home from "./pages/Home/Home"
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  const [showLoader, setshowLoader] = useState(true);

  const handleLoaderFinished = () => {
    setshowLoader(false);
  };
  return (
    <div style={{ overflow: 'hidden', height: "100vh"}}>
      <Navbar />
      <Home />
      {/* { showLoader && <VideoLoader onFinished = {handleLoaderFinished} />} */}
    </div>
  )
}

export default App