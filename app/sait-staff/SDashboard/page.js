"use client";
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Add from "./Add";
import Edit from "./Edit";
import {
  updateSaitStudentStatus,
  deleteStudentsFromAdmin,
} from "@/services/PostRequest/postRequest";

const Dashboard = (studentData, userData) => {
  const [students, setStudents] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState(false);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    if (studentData.studentData) {
      console.log("studentData: ", studentData);
      setStudents(studentData.studentData);
    }
  }, [studentData]);

  const handleEdit = (id) => {
    const student = students.find((student) => student.id === id);
    setSelectedStudent(student);
    setIsEditing(true);
  };

  const handleChangeStatus = async (id, status, uid) => {
    if (studentData.userData[0].role === "Admin" || studentData.userData[0].role === "Editor") {
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
          await updateSaitStudentStatus(id, status);
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

  const handleDelete = async (uid, docId) => {
    // Handle delete logic
    console.log("uid: ", uid);
    console.log("docId: ", docId);
    if (uid && docId && studentData.userData) {
      if (studentData.userData[0].role === "Admin" || studentData.userData[0].role === "Editor") {
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
            await deleteStudentsFromAdmin(docId, uid).then(() => {
              alert("User has been deleted");
            });
          }
        } catch (error) {
          console.error("An error occurred:", error);
          alert("An error occurred while deleting the user.");
        }
      }
    }
  };

  return (
    <div className="container">
      {students || students != null ? (
        <>
          {!isAdding && !isEditing && (
            <>
              <Table
                students={students}
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
            <Add setStudents={setStudents} setIsAdding={setIsAdding} />
          )}
          {isEditing && (
            <Edit
              selectedStudent={selectedStudent}
              setIsEditing={setIsEditing}
            />
          )}
        </>
      ) : (
        <div className="w-full text-center grid items-center justify-center h-screen">
          <p className="text-3xl font-bold animate-pulse">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
