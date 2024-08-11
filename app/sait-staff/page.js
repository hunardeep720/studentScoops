"use client";
import SDashboard from "./SDashboard";
import RDashboard from "./RDashboard";
import Dash from "./overviewDash";
import Settings from "./settingS";
import { LuLogOut } from "react-icons/lu";
import UserGreeting from "@/components/UserGreeting";
//import navbar
import SaitStaffNav from "@/components/SaitStaffNav";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getSaitData,
  getSaitDataByUser,
  getStudentData,
  getRestaurantData
} from "@/services/GetRequest/getRequest";
import { useUserAuth } from "@/services/utils";
import { getAuth, signOut } from "firebase/auth";

export default function Page() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("home"); // Set default active tab
  const [hideUserGreeting, setHideUserGreeting] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user } = useUserAuth();
  const [admin, setAdmin] = useState(null);
  const [students, setStudents] = useState(null);
  const [restaurants, setRestaurants] = useState(null);

  const router = useRouter();

  //<<<<<-------------------------------------------------fething related to sait Admin----------------------------------------------------------->>>>>

  //fetching sait admins data
  async function fetchData() {
    getSaitData(async (data) => {
      console.log("data: ", data);
      setAdmin(data);
      fetchSaitStaffUserInformation();
    });
  }

  //getting sait user data
  async function fetchSaitStaffUserInformation() {
    const data = await getSaitDataByUser(user);
    console.log("status: ", data);
    if (data.length > 0) {
      if (data[0].active == false || data[0].status == false) {
        router.push("/");
      }
    }
    if(data.length == 0){
      router.push("/");
    }
    setUserData(data);
    console.log("default: ", data);
  }

  //<<<<<-------------------------------------------------fething related to Students----------------------------------------------------------->>>>>

  //fetch students data
  async function fetchStudentData() {
    getStudentData(async (data) => {
      console.log("data: ", data);
      setStudents(data);
    });
  }

  //<<<<<-------------------------------------------------fething related to Restaurants----------------------------------------------------------->>>>>

   //fetch restaurants data
   async function fetchRestaurantData() {
    getRestaurantData(async (data) => {
      console.log("data: ", data);
      setRestaurants(data);
    });
  }


  useEffect(() => {
    if (user) {
      fetchData();
      fetchSaitStaffUserInformation();
      fetchStudentData();
      fetchRestaurantData();
    }
    if (user == false) {
      router.push("/");
    }
  }, [user]);

  // function to select the tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  function handeLogoutClick() {
    // handle logout click
    signOut(getAuth());
    return router.push("/");
  }

  useEffect(() => {
    if (activeTab === "setting") {
      setHideUserGreeting(true);
    } else {
      setHideUserGreeting(false);
    }
  }, [activeTab]);

  return (
    <div
      className="flex min-h-screen mx-auto"
      style={{
        backgroundImage: "linear-gradient(115deg, #F7F5EB, #F9F5F6)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <SaitStaffNav
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        onTabClick={handleTabClick}
      />
      {userData ||
      userData == undefined ||
      students ||
      students == undefined ? (
        <div
          className={`flex-1 flex flex-col mx-auto transition-all duration-300 ease-in-out ${
            isCollapsed ? "ml-20" : "ml-64"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-3 mt-2 mr-5">
            <div className="grid grid-cols-3 w-full">
              <div
                className={
                  hideUserGreeting
                    ? "hidden"
                    : "inline-flex items-center ml-5 rounded-full"
                }
              >
                <UserGreeting setActiveTab={setActiveTab} data={userData} />
              </div>
              <div className="col-start-3 grid w-full justify-items-end">
                <button
                  onClick={handeLogoutClick}
                  className=" w-1/2 inline-flex h-10 items-center justify-center rounded-md bg-gray-600 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#F29F3D] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#6c5ce7] dark:text-gray-50 dark:hover:bg-[#6c5ce7]/90 dark:focus-visible:ring-[#6c5ce7]"
                >
                  <LuLogOut className="mr-2 h-5 w-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 p-6">
            {/* select the tab based on the click */}
            {activeTab === "student" && <SDashboard studentData={students} userData={userData}/>}
            {activeTab === "restaurant" && <RDashboard userData={userData} restaurantData={restaurants}/>}
            {activeTab === "home" && (
              <Dash
                adminData={admin}
                fetchData={fetchData}
                fetchDataByUser={fetchSaitStaffUserInformation}
                data={userData}
                students={students}
                restaurants={restaurants}
              />
            )}
            {activeTab === "setting" && (
              <Settings
                data={userData}
                getUserData={fetchSaitStaffUserInformation}
              />
            )}
          </div>
        </div>
      ) : (
        <div className="w-full text-center grid items-center h-screen">
          <p className="text-3xl font-bold animate-pulse">Loading...</p>
        </div>
      )}
    </div>
  );
}
