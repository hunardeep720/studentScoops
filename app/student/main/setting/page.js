/**
 * v0 by Vercel.
 */
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import Passwordreset from "./passwordreset/page";
import { Checkbox } from "@/Components/ui/checkbox";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/Components/ui/dialog";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../../../../services/utils";
import { getStudentDataByStudents } from "../../../../services/GetRequest/getRequest";
import { deleteStudentUserByOwner } from "../../../../services/PostRequest/postRequest";
import { getAuth } from "firebase/auth";

export default function Settings() {
  const auth = getAuth();
  const { user } = useUserAuth();
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");

  const [deleteAccount, setDeleteAccount] = useState(false);
  const router = useRouter();

  //function to fetch student data
  function fetchStudentData() {
    getStudentDataByStudents((data) => {
      console.log(data);
      setUserData(data);
    }, user);
  }

  useEffect(() => {
    if (user) {
      fetchStudentData();
    } else if (user == false) {
      router.push("../../auth/sign-in");
    }
  }, [user]);

  const handleBackToMenu = () => {
    router.push("/student/main");
  };

  const toggleDeleteAccount = () => {
    setDeleteAccount(!deleteAccount);
  };
  const handleDeleteAccount = async () => {
    console.log("email: ", email);
    if (email !== userData[0].email) {
      alert("Email does not match");
      return;
    }
    if (email == userData[0].email) {
      await deleteStudentUserByOwner(auth.currentUser, userData[0].id);
      router.push("/");
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1  dark:bg-gray-800 p-6 md:p-10">
        <div className="max-w-4xl mx-auto grid gap-8">
          <div>
            <Button
              onClick={handleBackToMenu}
              className="transition-transform hover:scale-105 py-5 px-7 bg-primary hover:bg-orange-600"
            >
              Back
            </Button>
          </div>
          {userData && userData.length > 0 ? (
            <Passwordreset userData={userData} user={user} />
          ) : (
            <div className="w-full h-full flex items-center text-3xl animate-pulseß">
              Loading...
            </div>
          )}

          <section>
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Choose what you want to be notified about.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50">
                  <BellIcon className="mt-px h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Everything
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email digest, mentions & all activity.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Checkbox id="everything" defaultChecked />
                  </div>
                </div>
                <div className="-mx-2 flex items-start space-x-4 rounded-md bg-gray-100 p-2 text-gray-900 transition-all dark:bg-gray-800 dark:text-gray-50">
                  <AtSignIcon className="mt-px h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Available
                    </p>
                    <p className="text-sm text-gray-500 ">
                      Only mentions and comments.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Checkbox id="available" defaultChecked />
                  </div>
                </div>
                <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50">
                  <EyeOffIcon className="mt-px h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Ignoring</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Turn off all notifications.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Checkbox id="ignoring" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Privacy</h2>
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Manage your privacy and data settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50">
                  <LockIcon className="mt-px h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Protect my account
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Enable two-factor authentication.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Checkbox id="protect-account" defaultChecked />
                  </div>
                </div>
                <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50">
                  <ShieldIcon className="mt-px h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Secure my data
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Encrypt your data for added security.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Checkbox id="secure-data" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Support</h2>
            <Card>
              <CardHeader>
                <CardTitle>Get Help</CardTitle>
                <CardDescription>
                  Contact us for any issues or questions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50">
                  <PhoneIcon className="mt-px h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Call Support
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Speak with a customer service representative.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Button variant="ghost" size="icon">
                      <PhoneIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="-mx-2 flex items-start space-x-4 rounded-md p-2 transition-all hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50">
                  <MailIcon className="mt-px h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Email Support
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Send us a message and we&apos;ll get back to you.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <Button variant="ghost" size="icon">
                      <MailIcon className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            {userData && userData.length > 0 ? (
              <section className="w-full mx-0 py-12 md:py-16">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Delete Your Account</h2>
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
                            id="username"
                            placeholder="Enter your email"
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            setDeleteAccount(true);
                          }}
                          variant="destructive"
                          className="w-full"
                        >
                          Delete Account
                        </Button>
                        {deleteAccount && (
                          <Dialog defaultOpen>
                            <DialogTrigger asChild></DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>
                                  Delete Account Confirmation
                                </DialogTitle>
                                <DialogDescription>
                                  Are you sure you want to delete your Account
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <Button
                                  type="submit"
                                  className="w-full"
                                  onClick={() => handleDeleteAccount()}
                                >
                                  Yes
                                </Button>
                                <Button
                                  type="submit"
                                  className="w-full"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setDeleteAccount(false);
                                  }}
                                >
                                  No
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <div className="w-full h-full flex items-center text-3xl animate-pulseß">
                Loading...
              </div>
            )}
          </section>
        </div>
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
