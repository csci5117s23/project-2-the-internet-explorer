import Link from "next/link";

const MemoryViewButton = ({tripID, memoryID, filter, params, title, color}) => {
    let keys = Object.keys(params);
    // console.log('params category: ', params['category']);
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
        // <Link href={`/trips/${tripID}/${filter}/${memoryID}`}>
        <Link href={`/updated_trips/${tripID}/${filter}/${memoryID}${query}`}>
            <button
                type="button"
                className={"inline-block rounded px-14 pt-28 pb-4 text-s font-medium uppercase leading-normal text-neutral-50 -[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-black " + color}
                >
                {title}
            </button>
        </Link>
    )
}

export default MemoryViewButton;