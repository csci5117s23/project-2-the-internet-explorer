import React from "react";
import { Inter } from "next/font/google"
import Head from "next/head";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import TripsPage from "./trips";

const inter = Inter({ subsets: ["latin"] })

export default function Splash() {
  if (typeof window !== "undefined") {
    return (
      <>
        <SignedOut>
          <Head>
            <title>Welcome!</title>
            <link rel="icon" href="/favicon.png" />
          </Head>
          <style jsx global>{`
            body {
              background-color: aliceblue;
            }
          `}</style>

          <div className="bg-gradient-to-b from-blue-400 to-sky-400 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-2xl rounded-lg py-20 px-10 w-3/4">
            <main className="flex flex-col items-center justify-center">
              <h1 className="text-4xl sm:text-4xl font-bold text-center text-gray-100 mb-8">
                Welcome to the Vacation Tracker!
              </h1>
              <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-200">
                To track your vacations, please&nbsp;
                <SignInButton>
                <button className="inline-block mx-2 p-2 rounded-lg bg-blue-500 m-2">
                  <div>
                    Login
                  </div>
                </button>
                </SignInButton>
                &nbsp;or&nbsp;
                <SignUpButton>
                  <button className="inline-block mx-2 p-2 rounded-lg bg-blue-500">
                    <div>
                      Sign up
                    </div>
                  </button>
                </SignUpButton>
                !
              </h2>
            </main>
          </div>
        </SignedOut>
        <SignedIn>
          <TripsPage></TripsPage>
        </SignedIn>
      </>
    );
  }
}
