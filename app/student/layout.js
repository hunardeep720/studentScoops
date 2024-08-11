'use client'
import React from 'react';
import { AddressProvider } from './address-context/page';
import { AnimatePresence } from 'framer-motion';

export default function Layout({ children }) {
  return (
        <AnimatePresence>
        <AddressProvider>
          <main>{children}</main>
        </AddressProvider>
        </AnimatePresence>
      
  );
}
