import HomePage from "@/components/HomePage";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Splash from "..";
import Head from "next/head";

export default function TripsPage() {
  return (
    <>
      <SignedIn>
        <Head>
          <title>Your Trips!</title>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <HomePage></HomePage>
      </SignedIn>
      <SignedOut>
        <Splash></Splash>
      </SignedOut>
    </>
  );
}