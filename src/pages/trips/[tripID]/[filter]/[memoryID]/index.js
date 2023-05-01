import IndividualMemory from "@/components/IndividualMemory";
import { useRouter } from "next/router";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import Splash from "@/pages";

export default function MemoryPage() {
  const router = useRouter();
  const { memoryID, filter, tripID, category, day } = router.query;

  if (router.isReady) {
    return (
      <>
        <SignedIn>
          <IndividualMemory
            tripID={tripID}
            memoryID={memoryID}
            filter={filter}
            day={day}
            category={category}
            router={router}
          ></IndividualMemory>
        </SignedIn>
        <SignedOut>
          <Splash></Splash>
        </SignedOut>
      </>
    );
  }

  return <h1>memory page</h1>;
}
