"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { IoRestaurantOutline } from "react-icons/io5";

import Link from "next/link";
// import { Card } from "../../components/ui/card";

// import Slideshow from '@/components/SlideShow';
import DealoftheDay from "@/Components/DealoftheDay";
import { getRestaurantDataByStudents } from "@/services/GetRequest/getRequest";

const Home = () => {
  const small = useRef(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [filteredData, setFilteredData] = useState(null); // Initialize with data from JSON

  //to get the viewport category
  function getViewportCategory() {
    const width = window.innerWidth;
    console.log("width", width);

    if (width <= 600) {
      return (small.current = true);
    } else {
      return (small.current = false);
    }
  }
  useEffect(() => {
    getViewportCategory();
  }, []);

  async function fetchRestaurantData() {
    getRestaurantDataByStudents((data) => {
      setRestaurants(data);
      setFilteredData(data);
    });
  }

  useEffect(() => {
    fetchRestaurantData();
  }, []);

  // handle the search function of the page
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === "") {
      console.log("restaura data", restaurants);
      setFilteredData(restaurants); // Access restaurants array correctly
    } else {
      const results = restaurants.filter((item) =>
        item.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(results);
    }
  };

  //styling

  const introHeaderVariants = {
    hide: {
      opacity: 0,
      x: small ? 100 : 500,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 2,
      },
    },
  };

  const introPictureVariants = {
    hide: {
      opacity: 0,
      x: small ? -100 : -500,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 2,
      },
    },
  };

  return (
    <>
      <main>
        <section className="hidden h-screen w-full  items-center ">
          <div className="relative w-[50%] h-full">
            <motion.div
              className="absolute inset-0 z-0"
              initial="hide"
              whileInView="show"
              exit="hide"
              variants={introPictureVariants}
            >
              <div
                style={{
                  backgroundImage:
                    'url("/assets/3d-illustration-cartoon-character-with-burgers-cheeseburgers.png")',
                  backgroundSize: "contain",
                  backgroundPosition: "bottom-center",
                  backgroundRepeat: "no-repeat",
                }}
                className="w-full h-full"
              ></div>
            </motion.div>
          </div>

          <div className="relative w-[50%] flex items-center justify-center px-4 z-10 mr-4">
            <motion.div
              className="text-left text-black space-y-4 max-w-xl "
              initial="hide"
              whileInView="show"
              exit="hide"
              variants={introHeaderVariants}
            >
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
                Discover the Flavors of Our Renowned Restaurant
              </h1>
              <p className="text-lg mt-2">
                Experience the finest cuisine and impeccable service in a
                stunning, modern setting. Our menu features a delightful
                selection of seasonal dishes, crafted with the freshest
                ingredients.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="mt-8 mb-8 ">
          {filteredData && filteredData.length > 0 && filteredData != null ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-4xl font-bold mb-4">
                  Featured Restaurants
                </h2>
                <div className="relative w-full max-w-md ">
                  <input
                    type="search"
                    placeholder="Search for restaurants..."
                    className="w-full rounded-full border-2 border-gray-300 px-4 py-3 pr-10 focus:border-gray-500 focus:outline-none dark:border-gray-700 dark:bg-gray-950 dark:text-gray-50"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-700 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-100"
                  >
                    <SearchIcon className="h-6 w-6 text-primary" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:p-6">
                {filteredData.map((restaurant) => (
                  <Link
                    key={restaurant.id}
                    href={{
                      pathname: "/restaurant",
                      query: {
                        restaurantId: restaurant.id,
                        uid: restaurant.uid,
                      }, // Pass the restaurant ID
                    }}
                    as={`/student/main/restaurant?restaurantId=${restaurant.id}&&uid=${restaurant.uid}`}
                    className="relative border-2 shadow-xl overflow-hidden rounded-lg group transition-transform hover:scale-105"
                  >
                    <img
                      src={
                        restaurant.imageUrl
                          ? restaurant.imageUrl
                          : "/assets/images/UserDefaultSaitStaff.png"
                      }
                      alt="Restaurant Image"
                      width={400}
                      height={300}
                      className="object-cover w-full h-60"
                    />

                    <div className="p-4 bg-background flex items-center">
                      <div className="flex-grow">
                        <h3 className="text-lg  text-primary font-semibold md:text-xl">
                          {restaurant.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {restaurant.address}
                        </p>
                      </div>
                      <div className="ml-2 self-center ">
                        <IoRestaurantOutline className="text-2xl text-primary" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div></div>{" "}
            </>
          ) : (
            <div className="flex h-screen w-full text-center justify-center items-center text-3xl animate-pulse">
              No restaurants found
            </div>
          )}
        </section>

        <section className=" dark:bg-[#1e1e1e] p-4 rounded-2xl ">
          <div className="container mx-auto flex flex-col items-center justify-center w-full h-full text-center">
            <DealoftheDay />
          </div>
        </section>
      </main>
    </>
  );
};

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

export default Home;
