import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DayDropdown = ({day}) => {

    if (day === undefined) {
        return <></>
    }

    return (
        <>
        <div className="flex text-black mt-1">
            <select className="text-black">
            <option value="All Days">All Days</option>
            <option value="Feb 3rd">Feb 3</option>
            </select>
            
        </div>
            
        </>
    )
}

export default DayDropdown;