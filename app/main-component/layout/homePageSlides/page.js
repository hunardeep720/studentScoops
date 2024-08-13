//made by Abdelmouzahir
// CarouselComponent.js
"use client";
import React from "react";
//These are Third party packages for smooth slideshow
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/Components/ui/carousel";
import Image from "next/image";

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
      <div className="sm:ml-10 ml-2 absolute top-1/2 -translate-y-1/2 left-4 md:left-10 rounded-full bg-orange-400 hover:bg-orange-500">
        <ArrowLeftIcon className="sm:h-16 sm:w-16 h-8 w-8 text-white cursor-pointer" />
      </div>
    ),
    nextArrow: (
      <div className="sm:mr-10 mr-2 absolute top-1/2 -translate-y-1/2 right-4 md:right-10 rounded-full bg-orange-400 hover:bg-orange-500">
        <ArrowRightIcon className="sm:h-16 sm:w-16 h-8 w-8 text-white cursor-pointer" />
      </div>
    ),
  };
  return (
    <div
      className="w-full max-w-screen-2xl"
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <Zoom {...zoomInProperties}>
        {images.map((each, index) => (
          <div className="w-full" key={index}>
            <div className="relative">
              <Carousel className="w-full m-2">
                <CarouselContent
                  style={{
                    display: "block",
                    justifyContent: "center",
                    marginLeft: "-1rem", // Tailwind uses 4 for 1rem
                    "@media (min-width: 640px)": {
                      // sm breakpoint in Tailwind
                      display: "flex",
                    },
                  }}
                >
                  <CarouselItem>
                    <Image
                      src={each}
                      width={500}
                      height={500}
                      layout="responsive"
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    />
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        ))}
      </Zoom>
    </div>
  );
};

export default Slideshow;
