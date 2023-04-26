import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const DayDropdown = ({day, tripMemories, router}) => {

    const [tripDays, setTripDays] = useState([]);
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


    if (day === undefined) {
        return <></>
    }

    useEffect(() => {
        const findDaysList = async () => {
          if (tripMemories) {
            let days = {};
            for (let memory of tripMemories) {
              if (days[memory.date]) {
                continue; // We already have this date represented.
              } else {
                days[memory.date] = memory;
              }
            }
            let daysList = [];
            for (const [date, memory] of Object.entries(days)) {
              let curDate = new Date(date);
              let month = curDate.getMonth();
              let day = curDate.getDate();
              daysList.push(`${months[month]} ${day}`);
                
            }
    
            setTripDays(daysList);
          }
        }
        findDaysList();
      }, [router]);

      console.log(tripDays)

    return (
    
        <>
        <div className="flex text-black mt-1">
            <select className="text-black">
            <option value="All Days">All Days</option>
            {tripDays.map((object, i) => {
                return <option key={i} value={object}>{object}</option>
            })}
            
            </select>
            
        </div>
            
        </>
    )
}

export default DayDropdown;