"use client";
import React from "react";
import { AnimatePresence } from "framer-motion";

export default function Layout({ children }) {
  return (
    <AnimatePresence>
      <main>{children}</main>
    </AnimatePresence>
  );
}
