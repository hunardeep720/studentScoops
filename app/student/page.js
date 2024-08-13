"use client";

import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { useRouter } from "next/navigation";
import { useAddress } from "@/services/address-context"; // Adjust the import path to where AddressContext is located
import Layout from "./transtion/Layout";
import zxcvbn from "zxcvbn";

export default function Component() {
  const { address, setAddress } = useAddress(); // Use the context
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (address.trim() === "") {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    } else {
      console.log("Delivery address:", address);
      router.push("/student/main");
    }
  };

  return (
    <Layout>
      <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url(/assets/heroPage.jpeg)", zIndex: 10 }}
      >
        <header className="absolute top-0 left-0 p-4">
          <h2 className="text-2xl font-bold uppercase text-primary">
            STUDENTSCOOPS
          </h2>
        </header>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 px-4">
          <h1 className="text-5xl font-bold text-white">
            Order <span className="text-primary">best discounted deals</span>{" "}
            near you
          </h1>
          <p className="text-xl font-medium text-white">
            Providing best deals for students
          </p>
          <div className="flex justify-center mt-8 w-full items-center  space-x-2">
            <div className="relative flex items-center w-full max-w-2xl bg-white border rounded-3xl shadow-md">
              <MapPinIcon className="absolute left-3 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Enter delivery address"
                className="w-full max-w-2xl pl-10 pr-4 py-2 text-lg border-none rounded-3xl focus:ring-0 focus:outline-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)} // Update the address context
              />
            </div>

            <Button
              variant="default"
              className="px-4 py-2 text-lg font-semibold text-white bg-primary rounded-md"
              onClick={handleSearch}
            >
              Start
            </Button>
          </div>
        </div>
        {showAlert && (
          <div className="fixed bottom-4 right-4 p-2 bg-red-500 text-white rounded-md shadow-md">
            <p>Please fill in the address</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
