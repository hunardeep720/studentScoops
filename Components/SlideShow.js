//made by Abdelmouzahir
// CarouselComponent.js
"use client";
import React from "react";
//These are Third party packages for smooth slideshow
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";

const Slideshow = () => {
  //Array of Images
  const images = [
    "/assets/Image1.jpg",
    "/assets/Image2.jpg",
    "/assets/Image3.jpg",
  ];

  //These are custom properties for zoom effect while slide-show
  const zoomInProperties = {
    scale: 1,
    duration: 3000,
    transitionDuration: 300,
    infinite: true,
    prevArrow: (
      <div className=" ml-2 absolute top-1/2 -translate-y-1/2 left-4 md:left-10 rounded-full bg-orange-400 hover:bg-orange-500">
        <ArrowLeftIcon className="h-8 w-8 text-white cursor-pointer" />
      </div>
    ),
    nextArrow: (
      <div className="mr-2 absolute top-1/2 -translate-y-1/2 right-4 md:right-10 rounded-full bg-orange-400 hover:bg-orange-500">
        <ArrowRightIcon className="h-8 w-8 text-white cursor-pointer" />
      </div>
    ),
  };
  return (
    <div className="w-full h-screen">
      <Zoom {...zoomInProperties}>
        {images.map((each, index) => (
          <div
            key={index}
            className="flex justify-center md:items-center items-start w-screen h-screen relative"
          >
            <img className="w-screen" src={each} />
          </div>
        ))}
      </Zoom>
    </div>
  );
};

export default Slideshow;