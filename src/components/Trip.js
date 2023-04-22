import Link from 'next/link';
import styles from '../styles/Trips.module.css';
import DeleteTripButton from './buttons/DeleteFileButton';

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

  function getHover() {
    if (index >= 0) {
      return "hover:bg-black"
    }
    else {
      return ""
    }
  }

  // TODO make edit/delete buttons little circles w/ icons inside that only appear on hover
  return (
    <>
    <Link href={`/trips/${id}`}>
    <div className={styles.tripDiv + " " + colors[index] + " " + getHover()}>
      {/* <div className={styles.editDelDiv}><span className={styles.editDelSpan}><span>Edit</span> | <span>Delete</span></span></div><br></br> */}
      <div className={styles.dateDiv}><span>{date_format[0] + " " + date_format[1]}</span></div><br></br>
      <div className={styles.title}><span>{title}</span></div>
    </div>
    </Link>
    </>
  );
}