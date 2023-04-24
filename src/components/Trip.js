import Link from 'next/link';
import styles from '../styles/Trips.module.css';
import EditTripButton from './buttons/EditTripButton';

export default function Trip({ id, title, startDate, endDate, index }) {
  // This is the component for an individual trip.

  // TODO: Create the individual trip representation.

  // todo used img as background instead of color if one is present
  const colors = [
    "bg-emerald-400", "bg-sky-400", "bg-fuchsia-400", "bg-indigo-400", "bg-green-400", 
    "bg-yellow-400", "bg-orange-400", "bg-red-400", "bg-slate-400"
  ];
  index = index % colors.length;

  // show only month and year of start date
  const date = new Date(startDate);
  var options = {
    month: "long",
    year: "numeric"
  }
  const date_format = date.toLocaleDateString("en", options).split(' ')

  return (
    <>
    <Link className="" href={`/trips/${id}`}>
    <div className={"grid grid-cols-2 my-5 rounded-lg mx-10 " + colors[index] + " hover:bg-black"}>
      <div className={styles.title}><span>{title}</span></div>
      <div className="flex flex-col items-end">
        <div className="mt-3 mr-2.5"><EditTripButton></EditTripButton></div>
        <div className="text-white mr-2.5 mt-1.5"><span>{date_format[0] + " " + date_format[1]}</span></div>
      </div>
      
    </div>
    </Link>
    </>
  );
}