"use client";
import React, { useState, useEffect } from "react";

import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/Components/ui/card";
import { getStudentDataByStudents } from "@/services/GetRequest/getRequest";
import { useUserAuth } from "@/services/utils";
import { useRouter } from "next/navigation";
import { formatPhoneNumber } from "@/Constant/formated";
import { db } from "@/app/firebase/config";
import { updateDoc, doc } from "firebase/firestore";

export default function MyProfile() {
  const { user } = useUserAuth();
  const [studentData, setStudentData] = useState(null);
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [showAlert, setShowAlert] = useState(false);

  const handleBackToMenu = () => {
    router.push("/student/main");
  };

  //fetch student data
  function fetchStudentData() {
    getStudentDataByStudents((data) => {
      setStudentData(data);
      setFirstName(data[0].name);
      setLastName(data[0].lastName);
      setPhoneNumber(data[0].phoneNumber);
      setAddress(data[0].address);
    }, user);
  }

  useEffect(() => {
    if (user) {
      fetchStudentData();
    }
    if (user == false) {
      router.push("/");
    }
  }, [user]);

  const handleUpdate = async () => {
    if (
      firstName !== "" ||
      lastName !== "" ||
      phoneNumber !== "" ||
      address !== ""
    ) {
      try {
        const docRef = doc(db, "students", studentData[0].id);
        await updateDoc(docRef, {
          name: firstName,
          phoneNumber: phoneNumber,
          address: address,
          lastName: lastName,
        });
      } catch (err) {
        console.log(err);
      }
    }
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <section className="m-10 mt-6 p-10 w-2/3">
        <h2 className="text-2xl font-bold mb-4">Account</h2>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Update your name, email, and phone number.
            </CardDescription>
          </CardHeader>
          {studentData && studentData !== null && studentData.length > 0 ? (
            <>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="name">First Name</Label>
                    <Input
                      id="name"
                      defaultValue={studentData[0].name}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="name">Last Name</Label>
                    <Input
                      id="name"
                      defaultValue={studentData[0].lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={studentData[0].email}
                      readOnly
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      defaultValue={studentData[0].phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(formatPhoneNumber(e.target.value));
                      }}
                    />
                  </div>
                  <div className="space-y-1 col-span-full">
                    <Label htmlFor="name">Address</Label>
                    <Input
                      id="name"
                      defaultValue={studentData[0].address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleUpdate}
                  className="transition-transform hover:scale-105 mr-3"
                >
                  Save Changes
                </Button>
                <Button
                  onClick={handleBackToMenu}
                  className="transition-transform hover:scale-105 py-5 px-7 bg-primary hover:bg-orange-600"
                >
                  Back
                </Button>
              </CardFooter>
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <p className="font-bold text-3xl animate-pulse my-10">
                Loading...
              </p>
            </div>
          )}
        </Card>
      </section>
      {showAlert && (
        <div className="fixed p-3 w-30 top-15 right-4  bg-green-500 text-white rounded-md shadow-md">
          <p>Your Details are saved</p>
        </div>
      )}
    </div>
  );
}
