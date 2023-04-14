import styles from '../styles/Trips.module.css';

export default function Trip({ title, startDate, endDate }) {
  // This is the component for an individual trip.

  // TODO: Create the individual trip representation.

  return (
    <div className={styles.tripDiv}>
      <div className={styles.dateDiv}><span>{startDate}-{endDate}</span></div><br></br>
      <div className={styles.editDelDiv}><span className={styles.editDelSpan}><span>Edit</span> | <span>Delete</span></span></div><br></br>
      <div className={styles.title}><span>{title}</span></div>
    </div>
  );
}