"use client";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { useRouter } from "next/navigation";
import { deleteFoodFromCart } from "@/services/PostRequest/postRequest";
import {
  getStudentMenuByStudents,
  getRestaurantDataForCheckoutByStudents,
} from "@/services/GetRequest/getRequest";
import Swal from "sweetalert2";
import Image from "next/image";
import PropTypes from "prop-types";

const CheckoutCart = (studentData) => {
  const [subtotal, setSubtotal] = useState(0);
  const [cartItems, setCartItems] = useState(null); // for the items which are placed in student cart
  const router = useRouter();
  const [userData, setUserData] = useState(null); // for the restaurant data
  const [cartCounter, setCartCount] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  function fetchCartItems() {
    getStudentMenuByStudents((data) => {
      setCartItems(data);
    }, studentData[0].id);
  }

  function fetchRestaurantData() {
    getRestaurantDataForCheckoutByStudents((data) => {
      setUserData(data);
    }, cartItems[0].restaurantUid);
  }

  useEffect(() => {
    if (cartItems && cartItems !== null && cartItems.length > 0) {
      console.log("cartItems", cartItems);
      console.log("studentData", studentData);
      fetchRestaurantData();
      console.log("length", cartItems.length);
      setSubtotal(
        cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0)
      );
    }
    if (cartItems) {
      setCartCount(cartItems.length);
    }
  }, [cartItems]);

  useEffect(() => {
    if (studentData && studentData.length > 0) {
      fetchCartItems();
    }
  }, [studentData]);

  const handleClick = () => {
    router.push("/student/main/checkout");
    setIsSheetOpen(false);
  };

  const handleCartIsEmpty = () => {
    router.push("/student/main");
    setIsSheetOpen(false);
  };

  async function handleRemoveItem(item) {
    await deleteFoodFromCart(
      studentData[0].id,
      item.id,
      item.restaurantDocId,
      item.menuDocId,
      item.customerId
    ).then(() => {
      Swal.fire("Item removed from cart ❌");
    });
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="rounded-full bg-white text-black"
            onClick={() => setIsSheetOpen(true)}
          >
            <ShoppingCartIcon className="w-6 h-6" />
            {cartCounter > 0 && (
              <span className="ml-2 text-sm font-semibold">{cartCounter}</span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full max-w-lg bg-white rounded-lg shadow-xl"
        >
          <SheetHeader className="border-b">
            {userData && userData.length > 0 ? (
              <div className="flex flex-col items-center space-y-4">
                <Image
                  src={userData[0].imageUrl}
                  alt={userData[0].name}
                  width={400}
                  height={300}
                  className="w-full h-[300px] object-cover bg-cover bg-center rounded-lg"
                />
                <SheetTitle className="text-2xl font-bold">
                  {userData[0].name}
                </SheetTitle>
                <SheetDescription className="text-lg text-muted-foreground">
                  {userData[0].address}
                </SheetDescription>
              </div>
            ) : (
              <div className="px-8 py-6 space-y-4"></div>
            )}
          </SheetHeader>
          {cartItems && cartItems.length > 0 ? (
            <div className="px-6 py-4 space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className={item.status ? "relative" : "relative opacity-40"}
                >
                  {!item.status && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                      <p className="text-black text-xl font-bold">Sold</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-muted-foreground">
                          ${item.price}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(item)}
                      >
                        <TrashIcon className="w-4 h-4 text-primary text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-4 space-y-4 w-full">
              <Image
                src="/assets/pingcart.png"
                width={400}
                height={300}
                className="w-full h-[300px] object-cover bg-cover bg-center rounded-lg"
              />
              <p className="text-center text-muted-foreground animate-pulse font-bold text-2xl">
                Your cart is empty
              </p>
            </div>
          )}
          <SheetFooter className="px-8 py-6 border-t flex flex-col gap-4">
            {cartItems && cartItems.length > 0 ? (
              <>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex justify-between items-center w-full">
                    <div className="text-xl font-semibold">Subtotal</div>
                    <div className="text-xl font-semibold">${subtotal}</div>
                  </div>
                  <Button
                    onClick={handleClick}
                    className="w-full bg-primary text-white hover:bg-black/90 rounded-md py-3 text-lg"
                  >
                    Go to Checkout
                  </Button>
                </div>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={handleCartIsEmpty}
                className="w-full bg-primary rounded-md py-3 text-lg"
              >
                Add items to cart
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

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
CheckoutCart.propTypes = {
  studentData: PropTypes.any.isRequired, // Replace `any` with a more specific type if possible
};
export default CheckoutCart;
