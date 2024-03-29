import { Inter } from "next/font/google";
//import './globals.css'
//import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap/dist/css/bootstrap.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }} className={inter.className}>
        {children}
      </body>
    </html>
  );
}
