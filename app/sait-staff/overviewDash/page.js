"use client";
import Overview from "./overview";
import Table from "./table";
import { useState, useEffect } from "react";
import Add from "./Add";
import Edit from "./Edit";
import { useUserAuth } from "@/services/utils";
import {
  updateSaitEmployeeStatus,
  deleteSaitUserFromAdmin,
} from "@/services/PostRequest/postRequest";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import {
  getSaitData,
  getSaitDataByUser,
} from "@/services/GetRequest/getRequest";

export default function Dash(data, adminData, students, restaurants) {
  const auth = getAuth();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [editEmployeData, setEditEmployeData] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const { user } = useUserAuth();
  const [admin, setAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // async function fetchData() {
  //   getSaitData(async (data) => {
  //     console.log("data: ", data);
  //     setAdmin(data);
  //   });
  // }

  useEffect(() => {
    console.log("this block is running");
    if (data.adminData) {
      console.log("adminData: ", data.adminData);
      setAdmin(data.adminData);
    }
    if (data.data) {
      console.log("overviewdata: ", data.data);
      setUserData(data.data);
    }
  }, [adminData, data]);

  useEffect(() => {
    if (user == false) {
      router.push("/");
    }
    console.log("dash admin: ", admin);
  }, [admin]);

  useEffect(() => {
    if (user) {
      console.log("user", auth.currentUser);
    }
    if (user == false) {
      router.push("/");
    }
  }, [user]);

  const handleEditRequest = (user) => {
    setEditEmployeData(user);
    setIsEditing(true);
  };

  //handle to delte user form auth,storage and firestore
  const handleDelete = async (uid, docId) => {
    // Handle delete logic
    if (uid && docId && userData) {
      if (user === uid) {
        Swal.fire("You can't delete your own account");
        return;
      }
      console.log("role: ", userData[0].role);
      if (userData[0].role === "Admin" || userData[0].role === "Editor") {
        try {
          const res = await fetch("api/deleteUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid: uid }),
          });

          const data = await res.json();
          console.log("data: ", data);
          if (data.message === "User has been deleted") {
            await deleteSaitUserFromAdmin(docId, uid).then(() => {
              Swal.fire("User has been deleted ❌");
            });
          }
        } catch (error) {
          console.error("An error occurred:", error);
          Swal.fire("An error occurred while deleting the user.");
        }
      }
    }
  };

  //to change the status of the user
  const handleChangeStatus = async (id, status, uid) => {
    if (user === uid) {
      Swal.fire("You can't change your own status");
      return;
    }

    if (
      (userData[0] && userData[0].role === "Admin") ||
      (userData[0] && userData[0].role === "Editor")
    ) {
      try {
        const res = await fetch("/api/isDisableUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ condition: status, uid: uid }),
        });

        const data = await res.json();
        console.log("data: ", data);

        if (data.message === "User status has been updated") {
          await updateSaitEmployeeStatus(id, status);
          Swal.fire("Status for the given user has been changed ✅");
        } else if (
          data.error ===
          "There is no user record corresponding to the provided identifier."
        ) {
          Swal.fire(
            "Error: No user record corresponding to the provided identifier."
          );
        } else {
          Swal.fire("An unexpected error occurred.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        Swal.fire("An error occurred while changing the status.");
      }
    } else {
      Swal.fire("You are not authorized to change the status");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-2">
      <main className="flex flex-col items-start w-full px-20 py-4 ">
        <div className="self-start ml-5">
          {data.student && data.restaurant && (
            <Overview
              studentData={data.students}
              restaurantData={data.restaurants}
            />
          )}
        </div>
        <div className="flex flex-col items-center w-full mt-8">
          {isAdding ? (
            <>
              <Add
                admin={admin}
                setAdmins={setAdmin}
                setIsAdding={setIsAdding}
                // fetchDataByUser={fetchData}
              />
            </>
          ) : (
            <>
              {isEditing ? (
                <>
                  {" "}
                  <Edit
                    employeeData={editEmployeData}
                    setIsEditing={setIsEditing}
                    // getData={fetchData}
                    userData={userData}
                  />
                </>
              ) : (
                <>
                  <Table
                    admin={admin}
                    handleEdit={handleEditRequest}
                    handleDelete={handleDelete}
                    setIsAdding={setIsAdding}
                    handleChangeStatus={handleChangeStatus}
                  />
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
