import React from "react";
import {motion} from "framer-motion";
import Link from "next/link";


//reference => youtube tutorial 
export default function LearnMore({ setShow }) {
  return (
    <div className="flex flex-col lg:flex-row w-full h-full bg-white rounded-xl mx-auto shadow-xl overflow-hidden text-black">
      <div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: "url(/assets/images/contact.jpg)" }}
      >
      </div>
      <div className="w-full lg:w-1/2 py-16 px-11 flex flex-col justify-center">
        <h2 className="text-3xl mb-4 text-black">Trouble signing in?</h2>
        <p className="mb-1 text-md">⚫ Forgot your password?</p>
        <p className="mb-1 text-md">⚫ Locked out of your account?</p>
        <p className="mb-2 text-md ">⚫ We’ll help you resolve account access issues.</p>
        <p className="text-yellow-500 font-semibold"><Link href='/' >❓How to sign in </Link></p>
        <p className="text-yellow-500 font-semibold mb-2"><Link href='/' >❓Forgot your password </Link></p>
        <p className="mb-1 text-md ">⚫ Or you can contact Us:</p>
        <a href="support@studentscoops.ca" className=" hover:underline text-yellow-500 font-semibold">Support@studentscoops.ca</a>
        <p className="mb-1 text-md ">⚫ Or call us at:</p>
        <p className="text-yellow-500 font-semibold hover:underline mb-4">+1 403-284-7248</p>

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


