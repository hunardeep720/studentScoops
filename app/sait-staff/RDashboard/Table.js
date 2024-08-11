"use client";
import React, { useEffect, useState } from "react";
import { LuPencil } from "react-icons/lu";
import { AiFillDelete } from "react-icons/ai";
import { BsEnvelopeAtFill } from "react-icons/bs";
import Modal from "@/components/Modal";
import { IoStorefront } from "react-icons/io5";
import { formatPhoneNumber } from "@/Constant/formated";
import { MdOutlineDoneOutline } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import SendRegModal from "./SendRegModal";

const Table = ({
  restaurants,
  handleEdit,
  handleDelete,
  setIsAdding,
  setSearch,
  search,
  handleChangeStatus
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name");
  const [showModal, setShowModal] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [email, setEmail] = useState("");
  const [docId, setDocId] = useState("");
  const [uid, setUid] = useState("");
  const [isVisible, setIsVisisble] = useState(false);

  useEffect(() => {
    if (restaurants) {
      setFilteredRestaurants(
        restaurants && restaurants.length > 0
          ? restaurants.filter((restaurant) => {
              if (searchBy === "name") {
                return restaurant.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              } else if (searchBy === "email") {
                return restaurant.email
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
              } else if (searchBy === "phone") {
                return restaurant.phoneNumber.includes(searchTerm);
              }
              return true;
            })
          : []
      );
    }
  }, [restaurants]);

  return (
    <div className="container mx-auto mt-8 p-4 rounded-lg ">
      <h1 className="mb-8 text-4xl font-bold text-center tracking-tight text-orange-800 sm:text-5xl lg:text-4xl">
        Restaurant Management
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
          <IoStorefront className="mr-2 h-4 w-4" />
          Add Restaurant
        </button>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className={
            search
              ? "hidden"
              : "inline-flex items-center ml-2 justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
          }
        >
          <BsEnvelopeAtFill className="mr-2 h-4 w-4" />
          Send Registration Email
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label>Criteria</label>
          <select
            className="w-full rounded ml-2 p-1 border-black border-2"
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
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
                Restaurant Name
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
          <tbody className="divide-y divide-gray-200">
            {filteredRestaurants && filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          src={
                            restaurant.imageUrl
                              ? restaurant.imageUrl
                              : "/assets/images/UserDefaultSaitStaff.png"
                          }
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {restaurant.name[0].toUpperCase() +
                            restaurant.name.slice(1)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    {restaurant.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    {formatPhoneNumber(restaurant.phoneNumber)}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    <p
                      className={
                        restaurant.accountCreated
                          ? "text-gray-900 whitespace-no-wrap"
                          : "text-gray-900 whitespace-no-wrap animate-pulse"
                      }
                    >
                      {restaurant.accountCreated
                        ? restaurant.accountCreated.toDate().toDateString()
                        : "Loading..."}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                    <span
                      onClick={() => {
                        setIsVisisble(true);
                        setIsActive(restaurant.active),
                          setEmail(restaurant.email),
                          setDocId(restaurant.id);
                        setUid(restaurant.uid);
                      }}
                      className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded ${
                        restaurant.active ? "bg-green-400" : "bg-red-400"
                      }`}
                    >
                      <span aria-hidden></span>
                      <span className="p-3 cursor-pointer">
                        {restaurant.active ? "Active" : "InActive"}
                      </span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm grid grid-cols-2 gap-3 justify-stretch w-full text-center">
                    <button
                      onClick={() => handleEdit(restaurant.id)}
                      className="inline-flex items-center mr-2 justify-center rounded-md bg-green-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-green-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-green-900 dark:hover:bg-gray-200 dark:focus-visible:ring-gray-300"
                    >
                      Edit
                      <LuPencil className="ml-2 h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setIsDeleteModal(true);
                        setDocId(restaurant.id);
                        setUid(restaurant.uid);
                        setEmail(restaurant.email);
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
                  No restaurants found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <SendRegModal onClose={() => setShowModal(false)} />
      </Modal>
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
