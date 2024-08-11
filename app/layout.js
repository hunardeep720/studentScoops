import { Inter } from "next/font/google";
import "./globals.css";

import { AuthContextProvider } from "../services/utils";
import { AddressProvider } from "./student/address-context/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Student Scoops",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <AddressProvider>{children}</AddressProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
