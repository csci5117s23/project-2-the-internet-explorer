import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const EditTripButton = () => {
    return (
        <button
            type="button"
            className="inline-block text-white rounded-full hover:text-black px-6 pb-2 pt-2.5 text-s leading-normal transition duration-150 ease-in-out hover:bg-neutral-100 focus:bg-neutral-100"
            >
            <FontAwesomeIcon icon={faPenToSquare} />
        </button>
    )
}

export default EditTripButton;