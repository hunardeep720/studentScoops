
import React from "react";
import Link from "next/link";
import { Home, Package, ShoppingCart, Users } from "lucide-react";
import { useUserAuth } from "@/services/utils";

export default function Navbar() {
  const { user } = useUserAuth();
  // useEffect(()=>{
  //   if (user == false || !user){
  //     route.push('./auth/loginRestaurant')
  //   }
  // },[])
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-primary"
          >
            <span className="">STUDENT SCOOP</span>
          </Link>
        </div>
        <div className="flex-1 text-black">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/restraunt/home"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-4 w-4 text-primary" />
              Home
            </Link>
            <Link
              href="/restraunt/AddMenu"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4 text-primary" />
              AddMenu
            </Link>
            <Link
              href="/restraunt/order"
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 transition-all hover:text-primary"
            >
              <Package className="h-4 w-4 text-primary" />
              Orders
            </Link>
            <Link
              href="/restraunt/previousOrders"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4 text-primary" />
              Previous Orders
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
