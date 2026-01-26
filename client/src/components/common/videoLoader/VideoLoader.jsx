import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import splashVideo from '../../../assets/splashVideo.mp4';
import style from './videoLoaderStyle.module.scss';
import { useRef } from "react";

gsap.registerPlugin(useGSAP);
const VideoLoader = (onFinished) => {
  const containerRef = useRef();
  const videoRef = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(videoRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut"
    });
  }, { scope: containerRef });

  const runExitAnimation = () => {
    gsap.to(containerRef.current, {
      y: '-100%',
      duration: 1.2,
      ease: 'expo.inOut',
      onComplete: onFinished
    });
  };

  useGSAP(() => {
    const timer = setTimeout(() => {
      runExitAnimation();
    }, 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div ref={containerRef} className={style.videoLoaderContainer}>
        <video ref={videoRef} src={splashVideo}
        autoPlay muted playsInline loop className={style.video} />
    </div>
  )
}
export default VideoLoader;