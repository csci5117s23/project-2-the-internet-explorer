import React from "react";
import HomePage from "@/components/HomePage";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Splash from "..";
import Head from "next/head";
import { useRouter } from "next/router";
import LoadingCircle from "@/components/LoadingCircle";

export default function TripsPage() {
  const router = useRouter();
  
  if (router.isReady) {
    return (
      <>
        <SignedIn>
          <Head>
            <title>Your Trips!</title>
            <link rel="icon" href="/favicon.png" />
          </Head>
          <HomePage
            router={router}
          ></HomePage>
        </SignedIn>
        <SignedOut>
          <Splash></Splash>
        </SignedOut>
      </>
    );
  } else {
    return (
      <>
        <SignedIn>
          <LoadingCircle></LoadingCircle>
        </SignedIn>
        <SignedOut>
          <Splash></Splash>
        </SignedOut>
      </>
    );
  }
}