import React from "react";
import { motion } from "framer-motion";
import { TermsOfUse } from "@/app/auth/companyPolicies";


// same principe of learn more
//youtube tutorial
export default function Privacy({ setShow }) {
  return (
    <div className="flex flex-col w-full h-full bg-white rounded-xl mx-auto shadow-xl overflow-hidden text-black">
      <div className="bg-slate-100 flex-1 p-3 overflow-y-auto max-h-[400px]">
        {TermsOfUse.map((item, index) => (
          <div key={index} className="bg-slate-100 p-3 mb-2">
            <p className="font-semibold">{item.heading}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShow(false)}
        className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#6c5ce7] dark:text-gray-50 dark:hover:bg-[#6c5ce7]/90 dark:focus-visible:ring-[#6c5ce7]"
      >
        Close
      </motion.button>
    </div>
  );
}
