
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const VideoBackground = ({ videoUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <>
      <div className="absolute inset-0 bg-black/50 z-[1]"></div>
      <motion.video
        ref={videoRef}
        key={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <source src={videoUrl} type="video/mp4" />
      </motion.video>
    </>
  );
};

export default VideoBackground;
