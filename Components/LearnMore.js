import React from "react";
import {motion} from "framer-motion";


//reference => youtube tutorial 
export default function LearnMore({ setShow }) {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full bg-white rounded-xl mx-auto shadow-xl overflow-hidden text-black">
      <div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url(/assets/images/modal.jpg)" }}
      >
      </div>
      <div className="w-full lg:w-1/2 py-16 px-11 flex flex-col justify-center">
        <h2 className="text-3xl mb-4 text-black">Why Student Scoops?</h2>
        <p className="mb-4 text-sm"> Our platform bridges this gap by offering affordable meal options that fit within a student's budget. 
        By partnering with local restaurants and cafes, we ensure that students can enjoy a variety of delicious and nutritious meals without 
        breaking the bank.
        Join Student Scoops today and start savoring the benefits of great deals and even greater food!</p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShow(false)}
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#6c5ce7] dark:text-gray-50 dark:hover:bg-[#6c5ce7]/90 dark:focus-visible:ring-[#6c5ce7]"
        >
          Close
        </motion.button>
      </div>
    </div>
  );
}


