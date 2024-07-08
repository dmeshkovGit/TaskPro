import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerCalendar.css';
import { date } from 'yup';

const isLessThan24Hours = date => {
  const now = new Date();
  const timeDifference = date - now;
  return timeDifference > 0 && timeDifference < 24 * 60 * 60 * 1000;
};

const isLessThan48Hours = date => {
  const now = new Date();
  const timeDifference = date - now;
  return (
    timeDifference > 24 * 60 * 60 * 1000 && timeDifference < 48 * 60 * 60 * 1000
  );
};

export default function DatePickerCalendar({ setDeadline, deadline }) {
  const getDateFormat = date => {
    if (isLessThan24Hours(date)) {
      return "'Today', MMMM d ✎";
    } else if (isLessThan48Hours(date)) {
      return "'Tomorrow', MMMM d ✎";
    } else {
      return 'yyyy, MMMM d ✎';
    }
  };

  return (
    <DatePicker
      id="deadline"
      selected={deadline}
      onChange={date => setDeadline(date)}
      dateFormat={getDateFormat(deadline)}
      required
      shouldCloseOnSelect={false}
      className="deadlineInput"
      showPopperArrow={false}
      dayClassName={date => {
        if (date.getDate() > 23) {
          return 'prevMonth';
        }
      }}
      // fixedHeight
      popperPlacement="top-start"
    />
  );
}
