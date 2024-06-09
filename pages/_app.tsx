import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider className={fontInter.className}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
