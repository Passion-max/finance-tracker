"use client"

import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["100", "300", "500", "700", "900"] });
import Nav from "@/components/Navigation"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import Head from "@/app/head"

import FinanceContextProvider from "@/lib/store/finance-context";
import AuthContextProvider from "@/lib/store/auth-context";

// export const metadata = {
//   title: "Expenses Tracker",
//   description: "Personal Expenses Track",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body className={poppins.className}>
      <AuthContextProvider>
      <FinanceContextProvider>
        <ToastContainer />
        <Nav/>
        {children}
       </FinanceContextProvider>
        </AuthContextProvider>
        </body>
    </html>
  );
}
