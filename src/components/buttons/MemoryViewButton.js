import Link from "next/link";

export default function MemoryViewButton({ tripID, memoryID, title, image }) {
  return (
    <div className="mr-2 ml-2">
      <Link href={`/trips/${tripID}/memory/${memoryID}`} className="relative inline-block overflow-hidden">
      <img
        src={image}
        className="rounded-md h-full"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      <h1 className="rounded-md absolute bottom-0 left-0 right-0 text-center text-sm font-medium uppercase leading-normal text-neutral-50 px-2 py-1 bg-gray-900 bg-opacity-50">
        {title}
      </h1>
      </Link>
    </div>
  );
}