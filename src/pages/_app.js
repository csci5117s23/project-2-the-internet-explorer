import React from "react";
import "@/styles/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import Head from "next/head"
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps} >
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
