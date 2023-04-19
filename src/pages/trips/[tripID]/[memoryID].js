import { useRouter } from "next/router";
export default function MemoryView() {
  const router = useRouter();
  const memoryID = router.query.memoryID;
  return <div>{memoryID}</div>;
}
