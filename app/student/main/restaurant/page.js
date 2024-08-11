"use client";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import { HiBuildingStorefront } from "react-icons/hi2";
import { Badge } from "@/Components/ui/badge";
import Swal from "sweetalert2";
import {
  getRestaurantMenuByStudents,
  getRestaurantDataByOwner,
  getStudentDataByStudents,
  getStudentMenuByStudents,
  getStudentConfirmOrderData,
} from "@/services/GetRequest/getRequest";
import { addMenuToStudent } from "@/services/PostRequest/postRequest";
import { useUserAuth } from "@/services/utils";
import Modal from "@/Components/Modal";
import Link from "next/link";
import Layout from "../../transtion/Layout";
import { motion } from "framer-motion";

 
export default function RestaurantMenu() {
  const [menuItems, setMenuItems] = useState(null);
  const [menuDocumentIds, setMenuDocumentIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserAuth();
  const [studentData, setStudentData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("restaurantId");
  const restaurantUid = searchParams.get("uid");
  const [restaurantDocumentIds, setRestaurantDocumentIds] = useState([]);
  const [orderData, setOrderData] = useState(null);
  const [menu, setMenu] = useState(null);

  const [restaurant, setRestaurant] = useState(null);
 
  function fetchRestaurantMenu() {
    getRestaurantMenuByStudents((data) => {
      setMenu(data);
      setFilteredItems(data);
    }, restaurantId);
  }
 
  function fetchRestaurantData() {
    getRestaurantDataByOwner((data) => {
      setRestaurant(data);
    }, restaurantUid);
  }
 
  function fetchStudentData() {
    getStudentDataByStudents((data) => {
      setStudentData(data);
    }, user);
  }
 
  function fetchStudentMenu() {
    getStudentMenuByStudents((data) => {
      setMenuItems(data);
    }, studentData[0].id);
  }
 
  function fetchOrderData() {
    getStudentConfirmOrderData((data) => {
      setOrderData(data);
    }, studentData[0].id);
  }
 
  useEffect(() => {
    if (menuItems) {
      console.log("menuitemsvlength: ", menuItems.length);
    }
    if (menuItems && menuItems.length === 0) {
      console.log("length 0 condition ");
      setRestaurantDocumentIds([]);
      setMenuDocumentIds([]);
    } else if (menuItems && menuItems.length === 1) {
      console.log("length 1 condition ");
      const singleItem = menuItems[0];
      setRestaurantDocumentIds([singleItem.restaurantDocId]);
      setMenuDocumentIds([singleItem.menuDocId]);
    } else if (menuItems) {
      console.log("processing menu items: ", menuItems);
      const uniqueRestaurantDocIds = new Set();
      const uniqueMenuDocIds = new Set();
 
      menuItems.forEach((item) => {
        uniqueRestaurantDocIds.add(item.restaurantDocId);
        uniqueMenuDocIds.add(item.menuDocId);
      });
 
      setRestaurantDocumentIds([...uniqueRestaurantDocIds]);
      setMenuDocumentIds([...uniqueMenuDocIds]);
    }
  }, [menuItems]);
 
  useEffect(() => {
    console.log("menuCollectionRef: ", menuDocumentIds);
    console.log("restaurantCollectionRef: ", restaurantDocumentIds);
  }, [menuDocumentIds]);
 
  useEffect(() => {
    if (user) {
      fetchStudentData();
    }
  }, [user]);
 
  useEffect(() => {
    if (studentData && studentData.length > 0) {
      fetchStudentMenu();
      fetchOrderData();
    }
  }, [studentData]);
 
  useEffect(() => {
    fetchRestaurantMenu();
    fetchRestaurantData();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === "") {
      console.log("restaura data", menu);
      setFilteredItems(menu); // Access restaurants array correctly
    } else {
      const results = menu.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredItems(results);
    }
  };
 
  const handleBackToMenu = () => {
    router.push("/student/main");
  };
 
  const addToCart = async (item) => {
    if (user == false && !studentData) {
      setIsModalOpen(true);
      return;
    }
    if (!item && !restaurant) {
      Swal.fire("Please select an item to add to cart");
      return;
    } else {
      const data = {
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        description: item.description,
        status: true,
        addedAt: new Date(),
        orderAt: null,
        restaurantDocId: restaurant[0].id,
        menuDocId: item.id,
        restaurantUid: restaurant[0].uid,
        quantity: item.quantity,
        customerId: null,
        orderId: null,
        restaurantName: restaurant[0].name,
        restaurantAddress: restaurant[0].address,
        pickupAt: null,
      };
      console.log("menu length: ", menuDocumentIds.length);
      console.log("restaurant length: ", restaurantDocumentIds.length);
      if (restaurantDocumentIds.length <= 1 && menuDocumentIds.length >= 0) {
        if (menuDocumentIds.includes(item.id)) {
          alert("Item already added to cart");
        } else if (orderData && orderData.length > 0) {
          alert(
            "You have an active order. Please pick-up the order to add more items to cart"
          );
          return;
        } else if (
          (restaurantDocumentIds.length === 0 ||
            restaurantDocumentIds.includes(restaurant[0].id)) &&
          (menuDocumentIds.length === 0 || !menuDocumentIds.includes(item.id))
        ) {
          await addMenuToStudent(
            data,
            studentData[0].id,
            restaurant[0].id,
            item.id
          ).then(() => {
          setShowAlert(true)
          setTimeout(() => {
            setShowAlert(false)
          }, 3000)
            
          });
        } else {
          Swal.fire("You can only add items from one restaurant at a time");
        }
      }
    }
  };

  const [showAlert, setShowAlert] = useState(false)
 
  return (
    <Layout>
    <div className="flex flex-col">
    <div className="flex justify-between items-start w-full  mb-3 ">
        <motion.button
        whileHover={{ scale: 1.6 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleBackToMenu}
        >
           <IoMdArrowRoundBack  className=" text-primary  text-4xl" />
        </motion.button>
      </div>
      {restaurant && restaurant.length > 0 && restaurant != null ? (
        <section>
          <div
            className="bg-cover w-full h-[300px] bg-center bg-no-repeat rounded-3xl"
            style={{
              backgroundImage: `url(${
                restaurant[0].imageUrl
                  ? restaurant[0].imageUrl
                  : "/assets/images/UserDefaultSaitStaff.png"
              })`,
            }}
          ></div>
            <div className="flex flex-col sm:flex-row mt-6 px-6">
              <div className="flex flex-col sm:flex-row w-full items-center sm:items-start">
                <div className="flex items-center justify-center mr-4">
                  <HiBuildingStorefront className="text-5xl text-gray-700" />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-4xl font-bold text-black">
                    {restaurant[0].name}
                  </h1>
                  <p className="ml-1 text-gray-600">
                    <span className="text-gray-800">Address: </span>
                    {restaurant[0].address}
                  </p>
                </div>
              </div>
              <div className="flex mt-4 sm:mt-0 sm:ml-auto items-center">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search in the menu"
                    className="pl-10 pr-4 py-2 rounded-full bg-white shadow-md w-80"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
        </section>
      ) : (
        <div className=" container mx-auto px-4 md:px-6 py-8 md:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
          Loading..
        </div>
      )}
      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems && filteredItems.length > 0 && filteredItems != null ? (
          <>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={
                  item.status
                    ? "relative bg-background border-2 shadow-xl rounded-md overflow-hidden"
                    : "relative bg-background border-2 shadow-xl rounded-md overflow-hidden"
                }
              >
                {!item.status && (
                  <Badge
                    variant="outline"
                    className="absolute  text-xl top-2 right-2 z-10 bg-primary"
                  >
                    Sold
                  </Badge>
                )}
                <div className={item.status ? "" : "opacity-40"}>
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-[200px] object-cover bg-cover bg-center"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {item.description}
                    </p>
                    <p className="text-muted-foreground text-xl mb-4 font-bold">
                      Quantity: {item.quantity}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">${item.price}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        className={
                          item.status
                            ? "text-primary cursor-pointer"
                            : "text-primary cursor-default"
                        }
                        onClick={() => {
                          item.status ? addToCart(item) : null;
                        }}
                      >
                        <PlusIcon className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="flex h-full w-full  justify-center items-center text-3xl animate-pulse">
            No Deals available
          </div>
        )}
      </section>
      <Modal isVisible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="w-full text-center grid items-center justify-center">
          <p className="font-bold py-3 text-3xl">You are not logged in yet.</p>
          <p className="py-2 text-xl">Please login first to add food to cart</p>
          <div className="grid grid-cols-3 gap-5 py-6 mt-2">
            <Link
              href="/auth/sign-in"
              className="bg-primary p-3 hover:bg-primary/70 cursor-pointer text-black font-bold"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="bg-primary p-3 hover:bg-primary/70 cursor-pointer text-black font-bold col-start-3"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </Modal>
      {showAlert && (
        <div className="fixed bottom-4  text-xl right-4 p-2 bg-yellow-500 text-white rounded-md shadow-md animate-bounce">
          <p>ITEM ADDED TO CART</p>
        </div>
      )}
    </div>
    </Layout>
    


    
  );
}
function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
 