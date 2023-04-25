import CategoryButton from './CategoryButton.js';
import styles from '../../styles/TripView.module.css';
import TripSummaryWrapper from '../TripSummaryWrapper.js';
import EditTripWrapper from '../EditTripWrapper.js';



const buttons = [
  "Places", "Events", "Food", "Souvenirs", "People"
]

export default function CategoryButtonWrapper({ tripID, date, curr_category, tripMemories, setTripMemories }) {

  function isSelected(name) {
    if (name === curr_category) {
      return true
    }
    return false
  }

  console.log(curr_category)

  return (
    <div className={styles.buttonGroup + "flex flex-wrap space-y-2 space-x-2"}>
      <br></br>
      {buttons.map(str => (
        <CategoryButton
        name={str}
        tripId={tripID}
        date={date}
        pressed={isSelected(str)}
        />
      ))}
      <TripSummaryWrapper parentId={tripID} tripMemories={tripMemories} setTripMemories={setTripMemories}/>
    </div>
  )
}