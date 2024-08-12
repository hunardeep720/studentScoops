'use client'
import React from 'react';
import { AddressProvider } from '@/services/address-context';
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
