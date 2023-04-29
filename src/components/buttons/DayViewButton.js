import Link from "next/link";

const DayViewButton = ({tripID, title, ISOString, color, image}) => {
    // console.log(image);
    return (
      <Link href={`/trips/${tripID}/day?day=${ISOString}`}>
        {/* <button
          type="button"
          className={
            "inline-block rounded px-14 pt-28 pb-4 text-s font-medium uppercase leading-normal text-neutral-50 -[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-black " +
            color
          }
        >
          {title}
        </button> */}
        <div className="relative inline-block overflow-hidden mr-2 ml-2">
          <img
            src={image}
            className="rounded-md h-full"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <h1 className="rounded-md absolute bottom-0 left-0 right-0 text-center text-sm font-medium uppercase leading-normal text-neutral-50 px-2 py-1 bg-gray-900 bg-opacity-50">
            {title}
          </h1>
        </div>
      </Link>
    );
}

export default DayViewButton;