import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps} >

      <Component {...pageProps} />
      
    </ClerkProvider>
  )
}
