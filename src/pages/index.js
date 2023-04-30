import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '../styles/Main.module.css';
import Head from 'next/head';
import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';
// import Trips from './trips';
import TripData from './trips/[[...tripData]]';
import TripsPage from './newTrips';

const inter = Inter({ subsets: ['latin'] })

export default function Splash() {
  //!!!! URGENT: UPDATE <LINK> COMPONENTS HREF BEFORE HOSTING ON NETFLIY !!!!//
  // Switch to use window.location.origin

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
                <Link href="https://grown-locust-7.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Ftrips">
                  Login
                </Link>
              </span>{" "}
              or{" "}
              <span className="inline-block mx-2 p-2 rounded-lg bg-blue-500">
                <Link href="https://grown-locust-7.accounts.dev/sign-up?redirect_url=http%3A%2F%2Flocalhost%3A3000%2Ftrips">
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
      </SignedOut>
      <SignedIn>
        <TripsPage></TripsPage>
      </SignedIn>
    </>
    // <h1>This is The Internet Explorers' app</h1>
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    //   <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
    //     <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
    //       Get started by editing&nbsp;
    //       <code className="font-mono font-bold">src/pages/index.js</code>
    //     </p>
    //     <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
    //       <a
    //         className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
    //         href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         By{' '}
    //         <Image
    //           src="/vercel.svg"
    //           alt="Vercel Logo"
    //           className="dark:invert"
    //           width={100}
    //           height={24}
    //           priority
    //         />
    //       </a>
    //     </div>
    //   </div>

    //   <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
    //     <Image
    //       className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
    //       src="/next.svg"
    //       alt="Next.js Logo"
    //       width={180}
    //       height={37}
    //       priority
    //     />
    //   </div>

    //   <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
    //     <a
    //       href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
    //         Docs{' '}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p
    //         className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
    //       >
    //         Find in-depth information about Next.js features and API.
    //       </p>
    //     </a>

    //     <a
    //       href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
    //         Learn{' '}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p
    //         className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
    //       >
    //         Learn about Next.js in an interactive course with&nbsp;quizzes!
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
    //         Templates{' '}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p
    //         className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
    //       >
    //         Discover and deploy boilerplate example Next.js&nbsp;projects.
    //       </p>
    //     </a>

    //     <a
    //       href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
    //       className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       <h2 className={`${inter.className} mb-3 text-2xl font-semibold`}>
    //         Deploy{' '}
    //         <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
    //           -&gt;
    //         </span>
    //       </h2>
    //       <p
    //         className={`${inter.className} m-0 max-w-[30ch] text-sm opacity-50`}
    //       >
    //         Instantly deploy your Next.js site to a shareable URL with Vercel.
    //       </p>
    //     </a>
    //   </div>
    // </main>
  );
}
