import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Main.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
// import Trips from './trips';
// import TripData from './oldTrips/[[...tripData]]';
import TripsPage from './trips';

const inter = Inter({ subsets: ['latin'] })

export default function Splash() {
  if (typeof window !== 'undefined') {
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
                To track your vacations, please{" "}
                <span className="inline-block mx-2 p-2 rounded-lg bg-blue-500 m-2">
                  <Link href={`https://grown-locust-7.accounts.dev/sign-in?redirect_url=${window.location.origin}`}>
                    Login
                  </Link>
                </span>{" "}
                or{" "}
                <span className="inline-block mx-2 p-2 rounded-lg bg-blue-500">
                  <Link href={`https://grown-locust-7.accounts.dev/sign-up?redirect_url=${window.location.origin}`}>
                    Sign up
                  </Link>
                </span>
                !
              </h2>
            </main>
          </div>
          {/* <div className={styles.mainDiv}>
            <main>
              <h1 className={styles.welcome}>Welcome to the Vacation Tracker!</h1>
              <br></br><br></br> */}
          {/* <h2>To track your vacations, <Link href='/trips'>login</Link></h2> */}
          {/* <h2>To track your vacations, <Link href='https://grown-locust-7.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Ftrips'>login</Link> or <Link href='https://grown-locust-7.accounts.dev/sign-up?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Ftrips'>sign up</Link>!</h2>
            </main>
          </div> */}
          {/* <RedirectToSignIn></RedirectToSignIn> */}
        </SignedOut>
        <SignedIn>
          <TripsPage></TripsPage>
        </SignedIn>
      </>
    );
  }
}
