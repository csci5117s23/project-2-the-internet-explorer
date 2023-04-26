import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Head from "next/head"

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps} >
      <Head>
        <link rel='icon' href='/favicon.png' />
      </Head>
      <Component {...pageProps} />

    </ClerkProvider>
  )
}
