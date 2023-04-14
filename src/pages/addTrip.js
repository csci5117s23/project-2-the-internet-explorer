import AddTrip from "@/components/addTrip";
import Header from "@/components/Header";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function AddTripPage() {
    return (
        <>
        <Header></Header>
        <AddTrip></AddTrip>
        </>
      )
}