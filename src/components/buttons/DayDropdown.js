import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DayDropdown = ({day}) => {

    if (day === undefined) {
        return <></>
    }

    return (
        <>
        <div className="flex text-white hover:text-black ml-12 mt-1">
            <h1 className="text-md">{day}</h1>
            <FontAwesomeIcon className="ml-1.5 mt-1.5"  icon={faAngleDown}/>
            
        </div>
            
        </>
    )
}

export default DayDropdown;