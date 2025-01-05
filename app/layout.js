"use client"

import "./globals.css"
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
