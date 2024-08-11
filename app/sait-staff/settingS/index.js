/**
 * v0 by Vercel.
 */
"use client";
import { Button } from "@/components/ui/button";
import Passwordreset from "./passwordreset/page";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useUserAuth } from "@/services/utils";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { deleteSaitUser } from "@/services/PostRequest/postRequest";
import { useRouter } from "next/navigation";
import UserProfile from "./userProfile/page";

export default function Settings({ data, getUserData }) {
  const route = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const { user } = useUserAuth();
  const auth = getAuth();
  const [saitData, setSaitData] = useState(null);

  useEffect(() => {
    if (data) {
      setSaitData(data);
    }
  }, [data]);

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (userEmail !== saitData[0].email) {
      alert("Email does not match");
      return;
    }
    if (userEmail == saitData[0].email) {
      await deleteSaitUser(auth.currentUser, saitData[0].id).then(() => {
        route.push("/");
      });
    }
  };
  return (
    <div className="flex min-h-screen mx-auto">
      <main className="flex-1  dark:bg-gray-800 p-6 md:p-10">
        {saitData ? (
          <div className="max-w-4xl mx-auto grid gap-8">
            <UserProfile data={saitData} getUserData={getUserData} />
            <Passwordreset auth={auth} email={saitData[0].email} />
            <section className="w-full mx-0 py-12 md:py-16">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">Delete Your Account</h1>
                  <div className="bg-white mx-auto py-5 px-10 w-2000 ">
                    <p className=" bg-white text-gray-500 dark:text-gray-400 ">
                      Deleting your account is a permanent action. All your
                      data, including your profile, projects, and any other
                      information associated with your account, will be
                      permanently removed. This action cannot be undone.
                    </p>
                    <form className="space-y-4">
                      <div className="space-y-2 pt-10">
                        <Label htmlFor="username">
                          Type your email to confirm
                        </Label>
                        <Input
                          onChange={(e) => {
                            setUserEmail(e.target.value);
                          }}
                          id="username"
                          placeholder="Enter your email"
                        />
                      </div>
                      <Button
                        onClick={(e) => handleDeleteAccount(e)}
                        variant="destructive"
                        className="w-full"
                      >
                        Delete Account
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <div className="w-full text-center grid items-center h-screen">
            <p className="text-3xl font-bold animate-pulse">Loading...</p>
          </div>
        )}
      </main>
    </div>
  );
}

function AtSignIcon(props) {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
    </svg>
  );
}

function BellIcon(props) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function EyeOffIcon(props) {
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
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

function LockIcon(props) {
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
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function MailIcon(props) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon(props) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ShieldIcon(props) {
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
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}
