import { useEffect, useState } from "react";
import VideoLoader from "./components/common/videoLoader/VideoLoader"
import Home from "./pages/Home"

const App = () => {
  const [showLoader, setshowLoader] = useState(true);

  const handleLoaderFinished = () => {
    setshowLoader(false);
  };
  return (
    <div style={{ overflow: 'hidden', height: "100vh"}}>
      <Home />
      { showLoader && <VideoLoader onFinished = {handleLoaderFinished} />}
    </div>
  )
}

export default App