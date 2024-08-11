import { parseISO, format } from 'date-fns';

// Function to handle Firestore Timestamp conversion
function convertFirestoreTimestampToDate(timestamp) {
    return timestamp && timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
}
  

export default function DateComponent({ dateObject }) {
    const date = convertFirestoreTimestampToDate(dateObject);
    const formattedDate = isNaN(date) ? 'Invalid Date' : format(date, 'LLLL d, yyyy');
  
    return <time dateTime={date}>{formattedDate}</time>;
  }


//because Timestamps of firebase are not compatible with JS I used this library
//to convert the timestamp to a date object and then format it using date-fns
//after that we stored the date and converted to a proper date