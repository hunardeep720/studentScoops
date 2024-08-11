"use client"
import React, { useState, useEffect } from 'react';
import Header from './dashbord_resta/component/header/page';
import Navbar from './dashbord_resta/component/navbar/page';
import { useUserAuth } from '@/services/utils';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';


const Layout = ({ children }) => {
  const router = useRouter();
  const { user } = useUserAuth();
  const [students, setStudents] = useState([]);

  // handle sign out of the page 
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('user');
      router.push('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  useEffect(() => {
    if (user === false) {
      console.log("User not authenticated");
      router.push('/');
    }
  }, [user]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Navbar />
      <div className="flex flex-col h-screen">
        <Header handleSignOut={handleSignOut} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
