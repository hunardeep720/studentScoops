"use client" // Indicates that this component uses client-side features like hooks or context

import React, { useState, useEffect } from 'react';
import Header_stud from './header_stud/page'; // Importing the header component for the student layout
import { useUserAuth } from '@/services/utils'; // Custom hook to manage user authentication
import { signOut } from 'firebase/auth'; // Firebase function to sign out the user
import { auth } from '@/app/firebase/config'; // Importing the Firebase authentication instance
import { useRouter } from 'next/navigation'; // Next.js hook to handle navigation
import { CartProvider } from "@/app/Restrauntitems/cart-context/page"; // Importing CartProvider to manage cart state

const Layout = ({ children }) => {
  const router = useRouter(); // Router instance for navigation
  const { user } = useUserAuth(); // Destructuring user from the useUserAuth hook to check authentication status
  

  // Function to handle user sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      sessionStorage.removeItem('user'); // Clear user data from session storage
      router.push('/'); // Redirect to the home page
    } catch (error) {
      console.error('Error signing out: ', error); // Log any errors that occur during sign out
    }
  };

  // Effect to check if the user is authenticated
  // useEffect(() => {
  //   if (user === false) {
  //     console.log("User not authenticated"); // Log message if the user is not authenticated
  //     router.push('/'); // Redirect to the home page if not authenticated
  //   }
  // }, [user]); // Effect runs whenever the `user` value changes

  return (
   
    <CartProvider> {/* Wraps the component tree in CartProvider to manage cart state */}
      <div className="flex flex-col h-screen"> {/* Main layout container */}
        <Header_stud handleSignOut={handleSignOut} /> {/* Render the header component with the sign out handler */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto"> {/* Main content area */}
          {children} {/* Render child components */}
        </main>
      </div>
    </CartProvider>
    
  );
};

export default Layout;
