import CategoryButton from './CategoryButton.js';
import styles from '../../styles/TripView.module.css';
import TripSummaryWrapper from '../TripSummaryWrapper.js';
import EditTripWrapper from '../EditTripWrapper.js';
import DayDropdown from './DayDropdown.js';



const buttons = ["Places", "Souvenirs", "Food", "Events", "People"];

export default function CategoryButtonWrapper({ trip, date, curr_category, tripMemories, day, router }) {
  // console.log('date in category wrapper: ', date);
  // console.log('day in category wrapper: ', day);

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
        <CategoryButton
          key="All Categories"
          name="All Categories"
          tripId={trip._id}
          date={date}
          pressed={isSelected("All Categories")}
        />
      {buttons.map(str => (
        <CategoryButton
        key={str}
        name={str}
        tripId={trip._id}
        date={date}
        pressed={isSelected(str)}
        />
      ))}
      </div>

      <div className="flex justify-between">
      <DayDropdown day={day} curCategory={curr_category} tripMemories={tripMemories} tripID={trip._id} router={router} />
      <TripSummaryWrapper
      parentId={trip._id} trip={trip} tripMemories={tripMemories} />
      </div>

    </div>
  )
}
