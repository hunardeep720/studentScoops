"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";

export default function Header(handleSignOut) {
  const router = useRouter();

  // onclick function for the settings of restaurant
  function handleonclick_setting() {
    router.push("/restraunt/setting");
  }

  function handle_support() {
    router.push("/restraunt/support");
  }

  function handleProfile() {
    router.push("/restraunt/profile");
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden text-primary"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold text-primary"
            >
              STUDENT SCOOPS
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-primary"
            >
              <Home className="h-5 w-5 text-primary" />
              Inventory
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground hover:text-primary"
            >
              <ShoppingCart className="h-5 w-5 text-primary" />
              Orders
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:text-primary"
            >
              <Package className="h-5 w-5 text-primary" />
              Products
            </Link>
            <Link
              href="#"
              className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:text-primary"
            >
              <LineChart className="h-5 w-5 text-primary" />
              Analytics
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full ml-auto hover:text-primary"
          >
            <CircleUser className="h-5 w-5 text-primary" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleProfile}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleonclick_setting}
          >
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handle_support}>
            Support
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
