'use client';

import React from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { IoRestaurant } from "react-icons/io5";
import { RiAdminFill } from "react-icons/ri";
import { PiStudentFill } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";

export default function Header() {
  const router = useRouter();

    const handleClick = () => {
        router.push("/auth/sign-in")
      }

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-primary">
      <div className="text-white font-semibold text-2xl">STUDENT SCOOPS</div>
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          className="rounded-md px-12 py-2 text-md font-medium transition-colors hover:bg-gray-200 bg-white text-black dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          Login
          <IoIosArrowDown className=" ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 rounded-md bg-white p-2 shadow-lg dark:bg-gray-800  ">
        <DropdownMenuItem>
          <Link href="/auth/sign-in" className="flex items-center gap-2 hover:text-primary " prefetch={false} >
            <PiStudentFill className="h-4 w-4" />
            Student
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/auth/loginRestaurant" className="flex items-center gap-2 hover:text-primary" prefetch={false}>
            <IoRestaurant className="h-4 w-4" />
            Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/sait-staff/login" className="flex items-center gap-2 hover:text-primary" prefetch={false}>
            <RiAdminFill className="h-4 w-4" />
            Sait Admin
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      </header>
  );
}

function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


