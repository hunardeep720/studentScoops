"use client";
import { useState, useEffect } from "react";
import React from "react";
import { LuPencil } from "react-icons/lu";
import { PiStudentBold } from "react-icons/pi";
import { MdOutlineDoneOutline } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Modal from "@/Components/Modal";

const Table = ({
  students,
  handleEdit,
  handleDelete,
  setIsAdding,
  setSearch,
  search,
  handleChangeStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCriteria] = useState("name");
  const [isVisible, setIsVisisble] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [email, setEmail] = useState("");
  const [docId, setDocId] = useState("");
  const [uid, setUid] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(null);

  function formatPhoneNumber(phoneNumberString) {
    const cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return phoneNumberString;
  }

  useEffect(() => {
    if (students) {
      setFilteredStudents(
        students && students.length > 0
          ? students.filter((student) => {
              const term = searchTerm.toLowerCase();
              if (searchCriteria === "name") {
                return student.name.toLowerCase().includes(term);
              } else if (searchCriteria === "email") {
                return student.email.toLowerCase().includes(term);
              } else if (searchCriteria === "phone") {
                return student.phoneNumber.includes(term);
              }
              return false;
            })
          : []
      );
    }
  }, [students]);

  return (
    <div className="container mx-auto mt-8 p-4 rounded-lg ">
      <h1 className="mb-8 text-4xl font-bold text-center tracking-tight text-orange-800 sm:text-5xl lg:text-4xl">
        Student Management
      </h1>
      <div className="flex mb-6">
        <button
          onClick={() => setIsAdding(true)}
          className={
            search
              ? "hidden"
              : "inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
          }
        >
          <PiStudentBold className="mr-2 h-4 w-4" />
          Add Student
        </button>

        <button
          onClick={() => {
            setSearch(!search);
            if (search) {
              setSearchTerm("");
            }
          }}
          className={
            search
              ? "inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
              : "ml-10 inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
          }
        >
          {search ? (
            <>
              <MdOutlineDoneOutline className="mr-2 h-4 w-4" />
              Done
            </>
          ) : (
            <>
              <FaFilter className="mr-2 h-4 w-4" />
              Filter by
            </>
          )}
        </button>
      </div>
      <div
        className={
          search
            ? "w-full grid grid-cols-3 gap-5 bg-white rounded mb-5 p-3"
            : "hidden"
        }
      >
        <div>
          <label>Search</label>
          <input
            className="rounded ml-2 p-1 border-black border-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
        </div>
        <div>
          <label>Criteria</label>
          <select
            className="rounded ml-2 p-1 border-black border-2 w-full"
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>
      </div>
      <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal table-fixed">
          <thead className="text-center">
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                createdAt
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100  text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents && filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          src={
                            student.imageUrl
                              ? student.imageUrl
                              : "/assets/images/UserDefaultSaitStaff.png"
                          }
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {student.name[0].toUpperCase() +
                            student.name.slice(1)}{" "}
                          {student.lastName[0].toUpperCase() +
                            student.lastName.slice(1)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    {student.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    {formatPhoneNumber(student.phoneNumber)}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    <p
                      className={
                        student.accountCreated
                          ? "text-gray-900 whitespace-no-wrap"
                          : "text-gray-900 whitespace-no-wrap animate-pulse"
                      }
                    >
                      {student.accountCreated
                        ? student.accountCreated.toDate().toDateString()
                        : "Loading..."}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    <span
                      onClick={() => {
                        setIsVisisble(true);
                        setIsActive(student.active),
                          setEmail(student.email),
                          setDocId(student.id);
                        setUid(student.uid);
                      }}
                      className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded ${
                        student.active ? "bg-green-400" : "bg-red-400"
                      }`}
                    >
                      <span aria-hidden></span>
                      <span className="p-3 cursor-pointer">
                        {student.active ? "Active" : "InActive"}
                      </span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm grid grid-cols-2 gap-3 justify-stretch w-full text-center">
                    <button
                      onClick={() => handleEdit(student.id)}
                      className="inline-flex items-center mr-2 justify-center rounded-md bg-green-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
                    >
                      Edit
                      <LuPencil className="ml-2 h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setIsDeleteModal(true);
                        setDocId(student.id);
                        setUid(student.uid);
                        setEmail(student.email);
                      }}
                      className="inline-flex items-center mr-2 justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
                    >
                      Delete
                      <AiFillDelete className="ml-2 h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 px-6 text-center text-black bg-white">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal isVisible={isVisible} onClose={() => setIsVisisble(false)}>
        <div>
          <h1 className="text-2xl font-extrabold mx-2">
            {isActive ? "Deactivate User" : "Activate User"}
          </h1>
          <span className="text-xl">
            <p className="p-2">
              Are you sure you want to {isActive ? "deactivate" : "activate"}{" "}
              email <p className="inline font-bold">{email}?</p> This will make
              it{" "}
              <p className="inline font-bold">
                {isActive ? "unavailable" : "available"}
              </p>
              <p className="inline"> to users.</p>
            </p>
          </span>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                handleChangeStatus(docId, isActive, uid);
                setIsVisisble(false);
              }}
              className={`cursor-pointer bg-danger p-2 rounded-xl font-bold text-md mr-3 ${
                !isActive
                  ? "bg-green-400 hover:bg-green-200"
                  : "bg-red-400 hover:bg-red-200"
              }`}
            >
              {isActive ? "inActive" : "Active"}
            </button>
            <button
              onClick={() => setIsVisisble(false)}
              className="cursor-pointer bg-orange-400 hover:bg-orange-200 p-2 rounded-xl font-bold text-md ml-3"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
      {/* Modal for delete */}
      <Modal isVisible={isDeleteModal} onClose={() => setIsDeleteModal(false)}>
        <div>
          <h1 className="text-2xl font-extrabold mx-2">Delete User</h1>
          <span className="text-xl">
            <p className="p-2">
              Are you sure you want to delete email{" "}
              <p className="inline font-bold">{email}?</p> This will delete all
              the data related to this user.
            </p>
          </span>
          <div className="flex justify-end mt-4">
            <button
              className={
                "cursor-pointer bg-danger p-2 rounded-xl font-bold text-md mr-3 bg-red-400 hover:bg-red-200"
              }
              onClick={() => {
                handleDelete(uid, docId);
                setIsDeleteModal(false);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => setIsVisisble(false)}
              className="cursor-pointer bg-orange-400 hover:bg-orange-200 p-2 rounded-xl font-bold text-md ml-3"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Table;
