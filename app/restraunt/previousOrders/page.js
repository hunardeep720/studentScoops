"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { deleteOrderHistoryByRestaurant } from "@/services/PostRequest/postRequest";
import {
  getRestaurantMenuHistoryByOwner,
  getRestaurantDataByOwner,
} from "@/services/GetRequest/getRequest";
import { useUserAuth } from "@/services/utils";

export default function Order() {
  const [itemData, setItemData] = useState(null);
  const [deleteOrder, setDeleteOrder] = useState(false);
  const [orders, setOrders] = useState(null);
  const { user } = useUserAuth();
  const [restaurantData, setRestaurantData] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  function fetchRestaurantData() {
    getRestaurantDataByOwner((data) => {
      console.log("Data: ", data);
      setRestaurantData(data);
    }, user);
  }

  function fetchOrders() {
    getRestaurantMenuHistoryByOwner((data) => {
      console.log("menu: ", data);
      setOrders(data);
    }, restaurantData[0].id);
  }

  useEffect(() => {
    if (user) {
      console.log("user: ", user);
      fetchRestaurantData();
    }
  }, [user]);
  const filteredOrders = orders
    ? orders.filter((order) => order.id.toString().includes(searchQuery))
    : [];

  useEffect(() => {
    if (
      restaurantData &&
      restaurantData !== null &&
      restaurantData.length > 0
    ) {
      fetchOrders();
    }
  }, [restaurantData]);

  const handleDeleteOrder = async () => {

    console.log("handlePickupComplete");
    console.log("itemData: ", itemData);
    console.log("restaurantData: ", restaurantData[0].id);

    await deleteOrderHistoryByRestaurant(
      restaurantData[0].id,
      itemData.id,
      restaurantData[0].uid,
      itemData.imageName,
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      <Input
        type="search"
        placeholder="Search by Order ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4"
      />
      {filteredOrders.length === 0 ? (
        <p className="text-center font-bold">No orders found.</p>
      ) : (
        <ul className="grid gap-4">
          {filteredOrders.map((order) => (
            <li
              key={order.id}
              className="bg-muted p-4 rounded-lg shadow-md flex flex-col md:flex-row md:items-center gap-4"
            >
              <div className="w-full flex justify-between">
                <div className="md:w-1/3">
                  <h2 className="text-lg font-semibold flex flex-col gap-2">
                    <span className="flex items-center gap-2">
                      <span className="font-bold">
                        Order ID: #{order.orderId}
                      </span>
                      <span className="text-sm font-normal text-muted-foreground">
                        <span>(Order At: {order.orderAt.toDate().toDateString()})</span>
                        
                      </span>
                    </span>
                    <span className="text-sm font-normal">(Pick-Up At: {order.pickupAt.toDate().toDateString()})</span>
                    <span>{order.customerName}</span>
                  </h2>
                  <ul className="mt-2 grid grid-cols-2 gap-2">
                    <li className="flex justify-between items-center bg-background rounded-md px-2 py-1">
                      <span className="text-sm">
                        {order.quantity}x {order.name}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center mr-10">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDeleteOrder(true);
                      setItemData(order);
                    }}
                    className="shadow-md"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <AlertDialog
        open={deleteOrder}
        onOpenChange={() => {
          setDeleteOrder(false);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Order History</AlertDialogTitle>
            <AlertDialogDescription>
              <div>
                <p>
                  Are you sure you want to delete the order from the history?
                </p>
                <p className="pt-1 font-semibold">
                  {" "}
                  This will delete the order history permanently.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDeleteOrder}
              className="text-white"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
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

function LoaderPinwheelIcon(props) {
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
      <path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5 2.2 5 5 5 5-2.2 5-5" />
      <path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
      <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function PauseIcon(props) {
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
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}
