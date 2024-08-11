// AddressContext.js
"use client";
import React, { createContext, useContext, useState } from 'react';

const AddressContext = createContext();

export function AddressProvider({ children }) {
  const [address, setAddress] = useState("southern Alberta institute of technology , calgary");

  return (
    <AddressContext.Provider value={{ address, setAddress }}>
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  return useContext(AddressContext);
}
