"use client";
import React from "react";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import { Card } from "./ui/card";
import { Button } from './ui/button';
 
const DealoftheDay = () => {
  const DataforDeals = [
    {
      id: "1",
      image: "https://i.pinimg.com/564x/44/7b/5b/447b5bc65de170c57ba9174a2e5c6ff6.jpg",
      name: "Gelato Bites",
      deal: "40% off after 10pm",
      price: "$9.99",
    },
    {
      id: "2",
      image: "https://i.pinimg.com/564x/46/de/61/46de61c432e482efb27334ed82f0e13b.jpg",
      name: "Cheesy Delight",
      deal: "Buy one get one free on weekends",
      price: "$12.99",
    },
    {
      id: "3",
      image: "https://i.pinimg.com/564x/9b/4f/87/9b4f877a9336c4a4cfc2291ffd8d557e.jpg",
      name: "Sushi Rolls",
      deal: "20% off on all orders above $50",
      price: "$15.99",
    },
    {
      id: "4",
      image: "https://i.pinimg.com/564x/71/f8/dd/71f8dd52a02a233c46f1ab4d88d22f7a.jpg",
      name: "Classic Burger",
      deal: "Free delivery on orders above $20",
      price: "$10.99",
    },
    {
      id: "5",
      image: "https://i.pinimg.com/564x/c8/1c/7f/c81c7f3b995c75b686c9e6e56cac09cf.jpg",
      name: "Taco Fiesta",
      deal: "Happy hour: 2 for 1 on drinks",
      price: "$8.99",
    }
  ];
 
  const zoomInProperties = {
    scale: 1.2,
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    prevArrow: (
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <ArrowLeftIcon className="h-10 w-10 text-orange-400 cursor-pointer hover:text-orange-600 transition duration-300" />
      </div>
    ),
    nextArrow: (
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <ArrowRightIcon className="h-10 w-10 text-orange-400 cursor-pointer hover:text-orange-600 transition duration-300" />
      </div>
    ),
  };
 
  return (
    <div className="w-full h-full bg-white dark:bg-[#2b2b2b] rounded-2xl border-2 p-6 shadow-lg">
      <Zoom {...zoomInProperties}>
        {DataforDeals.map((deal) => (
          <div key={deal.id} className="space-y-6 mb-8">
            <div className="inline-block rounded-lg bg-orange-100 dark:bg-orange-800 px-3 py-1 text-sm text-orange-600 dark:text-orange-200">
              Deal of the Day
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-800 dark:text-gray-100">
              Today&apos;s Top Discounted Meal
            </h2>
            <p className="max-w-3xl mx-auto text-gray-500 dark:text-gray-400 md:text-lg lg:text-base">
              Check out the amazing deal of the day and don&apos;t miss your chance to enjoy a delicious meal at a discounted price.
            </p>
            <div className="relative mb-10">
              <Card className="w-full max-w-3xl mx-auto p-4 shadow-md bg-white dark:bg-gray-800 transition transform hover:scale-105 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <img
                    src={deal.image}
                    width="550"
                    height="310"
                    alt={deal.name}
                    className="mx-auto aspect-video overflow-hidden rounded-xl object-cover transition transform hover:scale-110 duration-300"
                  />
                  <div className="flex flex-col justify-center space-y-4 p-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{deal.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400">{deal.deal}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{deal.price}</p>
                      <Button variant="outline" size="sm" className="transition transform hover:scale-105 duration-300 rounded-md  text-yellow-50 bg-black hover:bg-slate-200">
                        Order Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </Zoom>
    </div>
  );
};
 
export default DealoftheDay;