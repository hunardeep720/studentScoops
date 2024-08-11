"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useUserAuth } from "../../../../services/utils";
import Image from "next/image";
import { IoStorefront } from "react-icons/io5";
import {
  removeItemFromStudentMenu,
  deleteHistoryProductFromStudent,
} from "@/services/PostRequest/postRequest";
import { Button } from "@/Components/ui/button";
import { useRouter } from "next/navigation";
import {
  getStudentConfirmOrderData,
  getStudentDataByStudents,
  getStudentMenuHistory,
} from "@/services/GetRequest/getRequest";

export default function Component() {
  const { user } = useUserAuth();
  const router = useRouter();
  const [studentData, setStudentData] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [orderHistory, setOrderHistory] = useState(null);

  //function to fetch student data
  function fetchStudentData() {
    getStudentDataByStudents((data) => {
      setStudentData(data);
    }, user);
  }
  useEffect(() => {
    if (user) {
      fetchStudentData();
    } else if (user == false) {
      router.push("/auth/sign-in");
    }
  }, [user]);

  //function to fetch order data
  function fetchOrderData() {
    getStudentConfirmOrderData((data) => {
      setOrderData(data);
    }, studentData[0].id);
  }

  //function to fetch order history
  function fetchOrderHistory() {
    getStudentMenuHistory((data) => {
      console.log("menu history: ", data);
      setOrderHistory(data);
    }, studentData[0].id);
  }

  useEffect(() => {
    if (studentData && studentData.length > 0) {
      fetchOrderData();
      fetchOrderHistory();
    }
  }, [studentData]);

  const [openDialogId, setOpenDialogId] = useState(null);

  async function handleRemovePickUpOrder(item) {
    await removeItemFromStudentMenu(
      item.restaurantDocId,
      item.menuDocId,
      studentData[0].id,
      item.id
    ).then(() => {
      Swal.fire("Item remove from pick-up order cart ✅");
    });
  }

  async function handleRemoveOrderHistoryItem(item) {
    await deleteHistoryProductFromStudent(studentData[0].id, item.id).then(
      () => {
        Swal.fire("Item removed from order history ✅");
      }
    );
  }

  const handleBackToMenu = () => {
    router.push("/student/main");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-3">
        <Button
          onClick={handleBackToMenu}
          className="transition-transform hover:scale-105 py-5 px-7 bg-primary hover:bg-orange-600"
        >
          Back
        </Button>
      </div>
      <h1 className="text-2xl font-bold mt-6">Orders Yet To Pick-Up</h1>
      <section className="container mx-auto px-4 md:px-6 py-4 md:py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {orderData && orderData.length > 0 && orderData != null ? (
          <>
            {orderData.map((item) => (
              <div
                key={item.id}
                className={
                  item.status
                    ? "relative bg-background border-2 shadow-xl rounded-md overflow-hidden"
                    : "relative bg-background border-2 shadow-xl rounded-md overflow-hidden"
                }
              >
                <div>
                  <Image
                    src={
                      item.imageUrl
                        ? item.imageUrl
                        : "/assets/images/UserDefaultSaitStaff.png"
                    }
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-[200px] object-cover bg-cover bg-center"
                  />
                  <div className="p-4">
                    <p>Order Number: #{item.orderId}</p>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-xl font-bold">
                        Quantity: {item.quantity}
                      </p>
                      <span className="font-medium mr-4">
                        Price: ${item.price}
                      </span>
                    </div>
                    <p className="text-lg font-medium mt-5 flex items-center">
                      <IoStorefront className="mr-1" />
                      {item.restaurantName}
                    </p>
                    <p>{item.restaurantAddress}</p>
                  </div>
                  <div className="flex justify-end pb-3 pr-3">
                    <Button onClick={() => handleRemovePickUpOrder(item)}>
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="flex w-full text-center justify-center items-center font-bold text-lg">
              You don&apos;t have any orders to pick up.
            </div>
          </>
        )}
      </section>
      <hr className="my-10 border-gray-500 border-2" />
      <h1 className="text-2xl font-bold">Past Orders</h1>
      <section className="container mx-auto px-4 md:px-6 py-4 md:py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {orderHistory && orderHistory.length > 0 && orderHistory != null ? (
          <>
            {orderHistory.map((item) => (
              <div
                key={item.id}
                className={
                  item.status
                    ? "relative bg-background border-2 shadow-xl rounded-md overflow-hidden"
                    : "relative bg-background border-2 shadow-xl rounded-md overflow-hidden"
                }
              >
                <div>
                  <Image
                    src={
                      item.imageUrl
                        ? item.imageUrl
                        : "/assets/images/UserDefaultSaitStaff.png"
                    }
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-[200px] object-cover bg-cover bg-center"
                  />
                  <div className="p-4">
                    <p>Order Number: #{item.orderId}</p>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground text-xl font-bold">
                        Quantity: {item.quantity}
                      </p>
                      <span className="font-medium mr-4">
                        Price: ${item.price}
                      </span>
                    </div>
                    <p>
                      Pick-Up At:{" "}
                      {item.pickupAt
                        ? new Date(item.pickupAt).toLocaleString()
                        : "N/A"}
                    </p>
                    <p className="text-lg font-medium mt-5 flex items-center">
                      <IoStorefront className="mr-1" />
                      {item.restaurantName}
                    </p>
                    <p>{item.restaurantAddress}</p>

                    <div className="flex justify-end p-3">
                      <Button
                        onClick={() => handleRemoveOrderHistoryItem(item)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex h-screen w-full text-center justify-center items-center text-3xl animate-pulse">
            You don&apos;t have any past orders.
          </div>
        )}
      </section>
    </div>
  );
}

function ListIcon(props) {
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
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  );
}

function MoveHorizontalIcon(props) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
