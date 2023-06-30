import Video1 from "./videos/test-useImperativeHandle.mp4";
import { forwardRef, useImperativeHandle, useRef } from "react";
function Video(props, ref) {
  const videoRef = useRef();

  useImperativeHandle(ref, () => ({
    play() {
      videoRef.current.play();
    },

    pause() {
      videoRef.current.pause();
    },
  }));
  return <video src={Video1} width={300} ref={videoRef} />;
}

export default forwardRef(Video);
