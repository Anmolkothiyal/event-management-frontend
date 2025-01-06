import Footer from '@/component/core/Footer';
import Loader from '@/component/core/Loader';
import {Providers} from '@/redux/slice/provider';
import { Toaster } from "react-hot-toast";
import "./globals.css"
import '@/styles/global.scss'




export const metadata = {
  title: "EventManager",
  description: "EventManager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning={true}>
        <Providers>
          <Loader />
          <main className="">{children}</main>
        </Providers>
        <Toaster position="top-right" reverseOrder={false} />
        <Footer/>
      </body>
    </html>
  );
}

