import React from "react";
import Tilt from "react-parallax-tilt";  

const Cover = ({image,heading,subheading}) => {
  return (
    <div
      className="h-[500px] bg-cover bg-center text-white flex items-center justify-center"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
   
      <Tilt
        className="parallax-effect-img w-full md:w-1/2"
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        perspective={1000}
        transitionSpeed={1000}
        scale={1.05}
        gyroscope={true}
      >
        {/* Card with Content */}
        <div className="card bg-black bg-opacity-50 shadow-xl rounded-none p-6 md:p-8 text-white">
          <div className="card-body">
            <h1 className="text-center text-4xl font-bold uppercase mb-4">
              {heading}
            </h1>
            <p className="text-center">
              {subheading}
            </p>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default Cover;
