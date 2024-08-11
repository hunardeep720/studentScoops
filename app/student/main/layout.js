"use client"; // Indicates that this component uses client-side features like hooks or context

import React from "react";
import Header_stud from "./header_stud/page"; // Importing the header component for the student layout
import { signOut } from "firebase/auth"; // Firebase function to sign out the user
import { auth } from "@/app/firebase/config"; // Importing the Firebase authentication instance
import { useRouter } from "next/navigation"; // Next.js hook to handle navigation

const Layout = ({ children }) => {
  const router = useRouter(); // Router instance for navigation

  // Function to handle user sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      sessionStorage.removeItem("user"); // Clear user data from session storage
      router.push("/"); // Redirect to the home page
    } catch (error) {
      console.error("Error signing out: ", error); // Log any errors that occur during sign out
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {" "}
      {/* Main layout container */}
      <Header_stud handleSignOut={handleSignOut} />{" "}
      {/* Render the header component with the sign out handler */}
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto">
        {" "}
        {/* Main content area */}
        {children} {/* Render child components */}
      </main>
    </div>
  );
};

export default Layout;
