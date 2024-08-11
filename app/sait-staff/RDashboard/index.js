"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { deleteRestaurantData } from "@/services/PostRequest/postRequest";
import { updateSaitRestaurantStatus, deleteRestaurantsFromAdmin } from "@/services/PostRequest/postRequest";

import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";

const Dashboard = ({ restaurantData, userData }) => {
  const [restaurants, setRestaurants] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (restaurantData) {
      setRestaurants(restaurantData);
    }
  }, [restaurantData]);

  const handleEdit = (id) => {
    const [restaurant] = restaurants.filter(
      (restaurant) => restaurant.id === id
    );

    setSelectedRestaurant(restaurant);
    setIsEditing(true);
  };

  const handleDelete = async (uid, docId) => {
    // Handle delete logic
    console.log("uid: ", uid);
    console.log("docId: ", docId);
    if (uid && docId && userData) {
     if (userData[0].role === "Admin" || userData[0].role === "Editor") {
       try {
         const res = await fetch("api/deleteUser", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({uid:uid}),
         });

         const data = await res.json();
         console.log("data: ", data);
         if (data.message === "User has been deleted") {
           await deleteRestaurantsFromAdmin(docId,uid).then(()=>{
             alert("User has been deleted");
           })
         }
       } catch (error) {
         console.error("An error occurred:", error);
         alert("An error occurred while deleting the user.");
       }
     }
   }
 };

  //to update the status of the user
  const handleChangeStatus = async (id, status, uid) => {
    if (userData[0].role === "Admin" || userData[0].role === "Editor") {
      try {
        const res = await fetch("/api/isDisableUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ condition: status, uid: uid }),
        });
  
        console.log("Response status:", res.status);
        console.log("Response headers:", res.headers);
  
        const data = await res.json();
        console.log("data: ", data);
  
        if (data.message === "User status has been updated") {
          await updateSaitRestaurantStatus(id, status);
          alert("Status for the given user has been changed");
        } else {
          alert("An unexpected error occurred.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred while changing the status.");
      }
    } else {
      alert("You are not authorized to change the status");
    }
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Table
            restaurants={restaurants}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            setIsAdding={setIsAdding}
            search={search}
            setSearch={setSearch}
            handleChangeStatus={handleChangeStatus}
          />
        </>
      )}
      {isAdding && (
        <Add
          setRestaurants={setRestaurants}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          selectedRestaurant={selectedRestaurant}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
