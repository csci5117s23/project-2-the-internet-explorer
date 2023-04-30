import Link from 'next/link';
import styles from '../styles/Trips.module.css';
import EditTripWrapper from './EditTripWrapper';

export default function Trip({ id, title, month, year, index, description, allTrips, setAllTrips }) {
  // This is the component for an individual trip.
  // TODO: Create the individual trip representation.

  // todo used img as background instead of color if one is present
  const colors = [
    "bg-emerald-400", "bg-sky-400", "bg-fuchsia-400", "bg-indigo-400", "bg-green-400", 
    "bg-yellow-400", "bg-orange-400", "bg-red-400", "bg-slate-400"
  ];
  index = index % colors.length;

  // show only month and year of start date
  // const date = new Date(startDate);
  // var options = {
  //   month: "long",
  //   year: "numeric"
  // }
  // const date_format = date.toLocaleDateString("en", options).split(' ')

  return (
    <> 
    <div className={"grid grid-cols-10 my-5 rounded-lg mx-10 " + colors[index] + " hover:bg-black"}>
    {/* <Link className='col-start-1 col-span-9' href={`/newTrips/${id}`}> */}
    <Link className="col-start-1 col-span-9" href={`/trips/${id}`}>
      <div className={styles.title + " mt-8 mb-2 ml-4"}><span>{title}</span></div>
      <div className="text-white ml-4 mt-1 mb-2"><span>{`${month} ${year}`}</span></div>

    </Link>
      <div className="col-start-10 flex flex-col items-end">
        <div className="mt-3 mr-2.5">
          <EditTripWrapper 
            tripID={id} 
            tripName={title} 
            startMonth={month} 
            startYear={year} 
            description={description}
            allTrips={allTrips}
            setAllTrips={setAllTrips}
          ></EditTripWrapper>
        </div>
      </div>
      
      
    </div>
    
    </>
  );
}