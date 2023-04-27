import Link from "next/link";

const CategoryButton = ({name, tripId, date, pressed}) => {
    console.log('date in category button: ', date);
    let link = `/trips/${tripId}/category?category=${name}`;
    if (date) {
        link = `/trips/${tripId}/day?day=${date}&category=${name}`;
        if (name === "All Categories") {
            link = `/trips/${tripId}/day?day=${date}`;
        }
    } else if (name === "All Categories") {
        link = `/trips/${tripId}`;
    }
    // console.log('link: ', link);

    return (pressed ? (
        <Link href={link}>
            <button 
                type='button'
                className="inline-block border border-gray  mr-1 text-black rounded-full border-black-50 px-6 pb-2 pt-2.5 text-s leading-normal shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out bg-neutral-200 shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]"
            >
                {name}    
            </button>
        </Link>
    ) : (
        <Link href={link}>
            <button
                type='button'
                className='mr-1 inline-block border border-gray text-black rounded-full bg-neutral-50 border-black-50 px-6 pb-2 pt-2.5 text-s leading-normal shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]'
            >
                {name}
            </button>
        </Link>
    ));
}

export default CategoryButton;