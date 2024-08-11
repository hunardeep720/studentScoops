/**
 * v0 by Vercel.
 * @see https://v0.dev/t/G4TCFFaWzHA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/Components/ui/dialog";
import Link from "next/link";

export default function Payment() {
  const [paymentDone, setPaymentDone] = useState(false);
  const confirmedPayement = () => {
    setPaymentDone(!paymentDone);
  };
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 py-12 md:py-20">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 ">
            <div className="mt-2 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-950">
              <h2 className="text-4xl font-bold">Order Summary</h2>
              <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-800">
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center">
                    <img
                      src="https://i.pinimg.com/564x/55/02/f2/5502f20d18006dec855f986e5344951c.jpg"
                      alt="Product Image"
                      width={64}
                      height={64}
                      className="rounded-md"
                    />
                    <div className="ml-4">
                      <p className="font-medium">Bruschetta</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        Quantity: 3
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">$23.97</p>
                </div>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center">
                    <img
                      src="https://i.pinimg.com/564x/40/b0/d6/40b0d6f85533fd94da7c4febbd5ff4d7.jpg"
                      alt="Product Image"
                      width={64}
                      height={64}
                      className="rounded-md"
                    />
                    <div className="ml-4">
                      <p className="font-medium">Calamari Fritti</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        Quantity: 3
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">$32.97</p>
                </div>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <p className="text-gray-500 dark:text-gray-400">Total</p>
                  <p className="font-medium">$56.94</p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center ">
              <Link
                href="/Restrauntitems"
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                prefetch={false}
              >
                Return to Home
              </Link>
              <Link
                onClick={confirmedPayement}
                href="#"
                className="ml-4 inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-6 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                prefetch={false}
              >
                Pay and Checkout
              </Link>
              {paymentDone && (
                <Dialog defaultOpen>
                  <DialogTrigger asChild></DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-950 mt-6 ">
                      <div className="flex flex-col items-center justify-center gap-6 p-5">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                          <CheckIcon className="h-8 w-8 text-green-500 dark:text-green-400" />
                        </div>
                        <div className="space-y-2 text-center">
                          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Payment Successful
                          </h1>
                          <p className="text-gray-500 dark:text-gray-400">
                            Thank you for your purchase!
                          </p>
                        </div>
                        <div className="text-4xl font-bold">$56.94</div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
