import Header from "@/components/Header";
import TripsWrapper from "@/components/TripsWrapper";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";


export default function Trips() {
  // TODO: Have a header component that has hamburger menu, info about what page you are viewing and Clerk's <UserButton>

  // TODO: Add a list of trip "folders".

  return (
    <>
      <SignedIn>
        <Header></Header>
        <TripsWrapper></TripsWrapper>
      </SignedIn>
    </>
  )
}