import IndividualMemory from "@/components/IndividualMemory";
import { useRouter } from "next/router";


export default function MemoryPage() {
  const router = useRouter();
  const { memoryID, filter, tripID, category, day } = router.query;

  console.log('memory id: ', memoryID);
  console.log('filter: ', filter);
  console.log('trip id: ', tripID);
  console.log('category: ', category);
  console.log('day: ', day);

  if (router.isReady) {
    return (
      <IndividualMemory
        tripID={tripID}
        memoryID={memoryID}
        filter={filter}
        day={day}
        category={category}
        router={router}  
      ></IndividualMemory>
    )
  }

  return <h1>memory page</h1>
}