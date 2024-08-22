import React, { useState } from "react";
import { formatPhoneNumber } from "@/Constant/formated";
import Swal from "sweetalert2";

import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";

const Edit = ({ employeeData, setIsEditing, userData }) => {
  const [name, setName] = useState(employeeData.name);
  const [email, setEmail] = useState(employeeData.email);
  const [mobileNumber, setMobileNumber] = useState(employeeData.phoneNumber);
  const id = employeeData.id;
  const [role, setRole] = useState(employeeData.role);
  const [userRole, setUserRole] = useState(userData[0].role);
  const [address, setAddress] = useState(employeeData.address);

  const handleChangeRole = (e) => {
    setRole(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !email || !mobileNumber) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const employee = {
      id,
      name,
      email,
      mobileNumber,
      role,
      address,
    };

    const dataForUpdate = doc(db, "saitStaff", id);
    await updateDoc(dataForUpdate, employee);
    setIsEditing(false);

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `${employeeData.name}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="container mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg">
      <form onSubmit={handleUpdate} className="space-y-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Edit Employee
        </h1>
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            Employee Name
          </label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            // onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm cursor-not-allowed bg-black/20"
            readOnly={true}
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            name="phone"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(formatPhoneNumber(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label id="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          {userRole == "Admin" && (
            <select
              id="role"
              value={role}
              onChange={(e) => handleChangeRole(e)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
            >
              <option>Change the Role</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          )}
          {userRole !== "Admin" && (
            <select
              id="role"
              value={role}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
            >
              <option value={role}>{role}</option>
            </select>
          )}
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            id="address"
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Update
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
