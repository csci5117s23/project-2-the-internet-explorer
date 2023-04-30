import HomePage from "@/components/HomePage";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Splash from "..";


export default function TripsPage() {
  return (
    <>
      <SignedIn>
        <HomePage></HomePage>
      </SignedIn>
      <SignedOut>
        <Splash></Splash>
      </SignedOut>
    </>
  );
}