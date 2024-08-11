// address-context.js
"use client";
import React, { createContext, useState } from "react";

const AddressContext = createContext();

const AddressProvider = ({ children }) => {
  const [address, setAddress] = useState(
    "southern Alberta institute of technology, Calgary"
  );
  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

const useAddress = () => {
  return useContext(AddressContext);
};

export { AddressProvider, useAddress };
