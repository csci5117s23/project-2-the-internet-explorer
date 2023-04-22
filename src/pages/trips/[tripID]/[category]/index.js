import { useRouter } from "next/router"


export default function IndividualCategory() {
  const router = useRouter();
  let { category } = router.query;
  // let { tripID } = router.query.tripID;

  console.log('category: ', category);
  // console.log('trip id: ', tripID);

  return (
    <h1>This is an individual category page</h1>
  )
}