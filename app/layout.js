"use client"

import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import Nav from "@/components/Navigation"

import FinanceContextProvider from "@/lib/store/finance-context";
import AuthContextProvider from "@/lib/store/auth-context";

// export const metadata = {
//   title: "Expenses Tracker",
//   description: "Personal Expenses Track",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthContextProvider>
      <FinanceContextProvider>
        <Nav/>
        {children}
        </FinanceContextProvider>
        </AuthContextProvider>
        </body>
    </html>
  );
}
