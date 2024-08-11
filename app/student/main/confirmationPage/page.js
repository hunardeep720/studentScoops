"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  getStudentConfirmOrderData,
  getStudentDataByStudents,
} from "@/services/GetRequest/getRequest";
import { useUserAuth } from "@/services/utils";

function ShoppingCartIcon(props) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function CircleCheckIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ChevronDownIcon(props) {
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
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function Component() {
  const { user } = useUserAuth();
  const router = useRouter();
  const [studentData, setStudentData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [orderStatus, setOrderStatus] = useState("Placing Order");
  const [showCancelButton, setShowCancelButton] = useState(true);
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [showCancelMessage, setShowCancelMessage] = useState(false);
  const [isCartSummaryOpen, setIsCartSummaryOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);


  const cartItems = orderData ? orderData : [];

  //function to fetch student data
  function fetchStudentData() {
    getStudentDataByStudents((data) => {
      setStudentData(data);
    }, user);
  }

  function fetchOrderData() {
    getStudentConfirmOrderData((data) => {
      setOrderData(data);
    }, studentData[0].id);
  }

  function handleBackToMenu() {
    router.push("/student/main")
  }


  useEffect(() => {
    if (user) {
      fetchStudentData();
    } else if (user == false) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (studentData && (studentData !== null) & (studentData.length > 0)) {
      fetchOrderData();
    }
  }, [studentData]);

  useEffect(() => {
    if (orderData && orderData.length > 0) {
      const orderItems = new Set();
      orderData.map((item) => {
        orderItems.add(item.orderId);
      });
      setOrderId([...orderItems]);
    }
  }, [orderData]);

  useEffect(() => {console.log(orderId)}, [orderId]);

  useEffect(() => {
    const orderAnimation = () => {
      setTimeout(() => {
        setOrderStatus("Confirming Order .... ");
        setTimeout(() => {
          setShowOrderConfirmation(true);
          setOrderStatus("Order Confirmed");
          setShowCancelButton(false);
        }, 5000);
      }, 3000);
    };
    orderAnimation();
  }, []);

  const handleCancelOrder = () => {
    setOrderStatus("Order Canceled");
    setShowCancelButton(false);
    setShowOrderConfirmation(false);
    setShowCancelMessage(true);
  };

  const handlePush = () => {
    router.push("/student/main")
  }

  // Calculate cart totals
  const isArray = Array.isArray(cartItems);
  const cartItemsTotal = isArray
    ? cartItems.reduce((total, item) => total + parseFloat(item.price), 0)
    : 0;
  const tax = cartItemsTotal * 0.05;
  const total = cartItemsTotal + tax;

  return (
    <div className="flex max-h-screen flex-col">
      {!showOrderConfirmation && !showCancelMessage && (
        <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="relative h-64 w-64 border-solid border-4 rounded-full border-primary animate-pulse">
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white shadow-lg">
              <ShoppingCartIcon className="h-16 w-16 text-primary" />
            </div>
          </div>
          <p className="mt-8 text-3xl font-bold text-gray-800">{orderStatus}</p>
          {showCancelButton && (
            <button
              className="mt-4 inline-flex h-12 items-center justify-center rounded-md bg-black px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-yellow-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
              onClick={handleCancelOrder}
            >
              Cancel Order
            </button>
          )}
        </div>
      )}
      {showCancelMessage && (
        <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-2xl font-bold text-red-600">Order Canceled</p>
          <div className="mt-4 text-lg text-gray-800 text-center">
            <p>Your order has been canceled.</p>
            <p>Would you like to go to the main page?</p>
          </div>
          <div className="mt-6 flex gap-6">
            <Link
              href="/student/main/confirmationPage"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              prefetch={false}
            >
              Re-order
            </Link>
            <Link
              href="#"
              className="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-md transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
              prefetch={false}
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      )}
      {showOrderConfirmation && !showCancelMessage && (
        <main className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md text-center">
            <div className="animate-bounce">
              <CircleCheckIcon className="mx-auto h-20 w-20 text-green-500" />
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight text-gray-800">
              Order Confirmed
            </h1>
            <p className="mt-6 text-lg text-gray-800">
              Thank you for your order! Your order is being processed and will
              be shipped soon.
            </p>
          </div>
          <div className="py-4">{orderId && orderId.map((item)=>{
            return <p className="font-bold text-2xl">Order Number: #{item}</p>
          })}</div>
          <div className="mt-12 w-full max-w-md">
            <Card className="p-8 shadow-lg rounded-lg bg-white">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsCartSummaryOpen(!isCartSummaryOpen)}
              >
                <p className="font-semibold text-xl text-gray-800">
                  Order Summary ({isArray ? cartItems.length : 0} items)
                </p>
                <ChevronDownIcon
                  className={`w-8 h-8 text-gray-600 transition-transform ${
                    isCartSummaryOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {isCartSummaryOpen && (
                <div className="mt-6 space-y-6">
                  {isArray &&
                    cartItems.map((item) => (
                      <div
                        key={item.item_id}
                        className="flex items-center gap-6 bg-gray-100 p-6 rounded-lg"
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="rounded-md"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-lg text-gray-800">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <p className="text-base text-gray-600">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="text-xl font-bold text-gray-800">
                          ${item.price}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </Card>
            <Card className="p-8 mt-6 rounded-lg shadow-lg bg-white">
              <div className="space-y-6">
                <p className="font-semibold text-2xl text-gray-800">
                  Order Total
                </p>
                <div className="border-t border-gray-300 pt-6">
                  <div className="flex justify-between">
                    <p className="text-base text-gray-600">Subtotal</p>
                    <p className="font-semibold text-lg text-gray-800">
                      ${cartItemsTotal}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base text-gray-600">Taxes</p>
                    <p className="font-semibold text-lg text-gray-800">
                      ${tax.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-2xl text-gray-800">
                  <p>Total</p>
                  <p>${total}</p>
                </div>
              </div>
            </Card>
            <div className="flex items-center gap-6 mt-8">
            <Link
                  href={`https://www.google.com/maps/search/?api=1&query=`}
                  target="_blank"
                  className="w-full"
                >
              <Button className="bg-yellow-500 text-white hover:bg-black px-8 py-4 rounded-md shadow-md font-semibold">
                Navigate to Restaurant
              </Button>
            </Link>
              <Button onClick={handlePush} className="bg-white-600 text-black hover:bg-yellow-500 px-8 py-4 rounded-md shadow-md font-semibold">
                Back to Home Page
              </Button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
