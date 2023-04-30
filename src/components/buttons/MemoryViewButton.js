import Link from "next/link";

const MemoryViewButton = ({tripID, memoryID, filter, params, title, color, image}) => {
  let keys = [];
  if (params) {
    keys = Object.keys(params);
  }
  let query = '';
  if (keys.length > 0) {
      query += '?';
      if (params['day']) {
          query += `day=${params['day']}`;
          if (keys.length > 1) {
              query += '&'; // Add the ampersand if there is more than 1 query param.
          }
      }
      if (params['category']) {
          query += `category=${params['category']}`;
      }
  }

  return (
    <div className="mr-2 ml-2">
      {/* <Link href={`/newTrips/${tripID}/${filter}/${memoryID}${query}`} className="relative inline-block overflow-hidden"> */}
      <Link href={`/trips/${tripID}/${filter}/${memoryID}${query}`} className="relative inline-block overflow-hidden">
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

export default MemoryViewButton;