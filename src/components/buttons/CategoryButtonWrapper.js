import CategoryButton from './CategoryButton.js';
import styles from '../../styles/TripView.module.css';
import TripSummaryWrapper from '../TripSummaryWrapper.js';
import EditTripWrapper from '../EditTripWrapper.js';
import DayDropdown from './DayDropdown.js';



const buttons = ["Places", "Souvenirs", "Food", "Events", "People"];

export default function CategoryButtonWrapper({ tripID, date, curr_category, tripMemories, setTripMemories, day }) {

  function isSelected(name) {
    if (name === curr_category) {
      return true
    }
    return false
  }

  console.log(curr_category)

  return (
    <div className={" p-5 -mt-10 -mb-6 flex flex-col flex-wrap gap-2 "}>
      <br></br>
      <div className="border-b pb-3 ">
      {buttons.map(str => (
        <CategoryButton
        name={str}
        tripId={tripID}
        date={date}
        pressed={isSelected(str)}
        />
      ))}
      </div>
      
      <div className="flex justify-between">
      <DayDropdown day={day} />
      <TripSummaryWrapper 
      parentId={tripID} tripMemories={tripMemories} setTripMemories={setTripMemories}/>
      </div>
      
    </div>
  )
}