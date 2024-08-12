"use client";
import React, { createContext, useState, useContext } from "react";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState(
    "southern Alberta institute of technology, Calgary"
  );

  return (
    <>
      <AddressContext.Provider value={{ address, setAddress }}>
        {children}
      </AddressContext.Provider>
    </>
  );
};

export const useAddress = () => {
  return useContext(AddressContext);
};
