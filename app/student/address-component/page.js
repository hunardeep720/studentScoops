"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useAddress } from "@/services/address-context";

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const { address, setAddress } = useAddress();
  const handleClick = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
  };
  const handleSave = () => {
    handleAddressChange(address);
    setIsOpen(false);
  };
  return (
    <>
      <div className="flex items-center space-x-2">
        <MapPinIcon className="w-5 h-5 text-black" />
        <span className="text-black" onClick={handleClick}>
          {address.slice(0, 15)}...
        </span>
        <span className="text-black">•</span>
        <span className="text-black cursor-pointer" onClick={handleClick}>
          Now
        </span>
        <ChevronDownIcon className="w-5 h-5 text-black" />
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
        style={{
          backgroundColor: "rbg(0 0 0 / 0.01)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Address</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              value={address}
              onChange={(e) => handleAddressChange(e.target.value)}
              placeholder="Enter new address"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
