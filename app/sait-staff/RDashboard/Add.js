"use client";
import React, { useState } from "react";
import { formatPhoneNumber } from "@/Constant/formated";
import Swal from "sweetalert2";

import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { sendMail } from "@/lib/mail";
import PasswordEmail from "@/Components/PasswordEmail";
import ReactDOMServer from "react-dom/server";


const Add = ({ setRestaurants, setIsAdding }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const currentDate = new Date(); //current date of system

  let firstWord = name.split(" ");

  //generic password will be first name of student or restaurant + last three digits of mobile number + "!"
  // like student name :- Moiz Khan mobilenumber :- 1234567890, so the password will be Moiz890!
  // by this the password will bw different for every one and they can change it on forget password
  const genericPassword = firstWord[0] + phoneNumber.slice(-3).concat("!");

  //send email
 const send = async (event) => {
  //event.preventDefault(); // Prevent default form submission

  //convert the template to be readable for the user in the email
  const emailBody = ReactDOMServer.renderToString(
      <PasswordEmail name={name} email={email} password={genericPassword} />
  );
  try {
      await sendMail({
          to: email,
          name: 'No-reply',
          subject: 'Welcome to StudentScoops 🎉',
          body: emailBody,
      });
      return console.log("email was sent ")
  } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
  }
};

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!name || !email || !phoneNumber || !address) {
      return Swal.fire({
        icon: "error", 
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    try {
      console.log("geneic password: ", genericPassword);
      // Create user in Firebase Authentication
      const path = "/api/createUser";
      const displayName = name;
      const res = await fetch(`${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: genericPassword, displayName }),
      });
      const data = await res.json();
      const newRestaurant = {
        name,
        email,
        phoneNumber,
        uid: data.uid,
        address,
        accountCreated: currentDate,
        active: true,
        imageUrl: null,
      };
      await addDoc(collection(db, "restaurants"), {
        ...newRestaurant,
      });
      setIsAdding(false);
      send();

      Swal.fire({
        icon: "success",
        title: "Added!",
        text: `${name}'s data has been added.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="container mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg">
      <form onSubmit={handleAdd} className="space-y-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Add Restaurant
        </h1>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Restaurant Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            maxLength={14}
            name="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
