import Link from 'next/link';
import styles from '../styles/Trips.module.css';
import DeleteTripButton from './buttons/DeleteFileButton';

export default function Trip({ id, title, startDate, endDate, index }) {
  // This is the component for an individual trip.

  // TODO: Create the individual trip representation.

  // todo used img as background instead of color if one is present
  const colors = [
    "#1ABC9D", "#52D88B", "#2C97DE", "#9B56B8", "#34485E",
    "#EDC110", "#E77D23", "#E74B3D", "#95A4A6"
  ];
  index = index % colors.length;

  // while (index > colors.length) {
  //   index = index - colors.length
  // }

  // show only month and year of start date
  const date = new Date(startDate);
  var options = {
    month: "long",
    year: "numeric"
  }
  const date_format = date.toLocaleDateString("en", options).split(' ')

  // TODO make edit/delete buttons little circles w/ icons inside that only appear on hover
  return (
    <div className={styles.tripDiv} style={{backgroundColor: colors[index]}}>


      
      {/* <div className={styles.editDelDiv}><span className={styles.editDelSpan}><span>Edit</span> | <span>Delete</span></span></div><br></br> */}
      <div className={styles.dateDiv}><span>{date_format[0] + " " + date_format[1]}</span></div><br></br>
      <div className={styles.title}><Link href={`/trips/${id}`}><span>{title}</span></Link></div>
    </div>
  );
}