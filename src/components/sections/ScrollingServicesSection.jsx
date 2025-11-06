
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VideoBackground from '@/components/VideoBackground';

const AnimatedText = ({ children, scrollYProgress, index, total }) => {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(scrollYProgress, [start - 0.1, start, end, end + 0.1], [0.2, 1, 0.2, 0.2]);
  const scale = useTransform(scrollYProgress, [start - 0.1, start, end, end + 0.1], [0.8, 1, 0.8, 0.8]);

  return (
    <motion.h2
      style={{ opacity, scale }}
      className="text-6xl md:text-8xl lg:text-9xl font-extralight tracking-widest uppercase"
    >
      {children}
    </motion.h2>
  );
};

const ScrollingServicesSection = ({ services }) => {
  const containerRef = useRef(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const newIndex = Math.floor(latest * services.length);
      if (newIndex !== activeVideoIndex && newIndex < services.length) {
        setActiveVideoIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, services.length, activeVideoIndex]);

  return (
    <div id="services-container" ref={containerRef} className="relative" style={{ height: `${services.length * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Videos */}
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            id={service.id}
            className="absolute inset-0"
            style={{
              opacity: activeVideoIndex === index ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            <VideoBackground videoUrl={service.videoUrl} />
          </motion.div>
        ))}

        {/* Text */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            {services.map((service, index) => (
              <AnimatedText key={service.id} scrollYProgress={scrollYProgress} index={index} total={services.length}>
                {service.title}
              </AnimatedText>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollingServicesSection;
