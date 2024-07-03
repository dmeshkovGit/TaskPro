import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerCalendar.css';

export default function DatePickerCalendar({ setDeadline, deadline }) {
  return (
    <DatePicker
      id="deadline"
      selected={deadline}
      onChange={date => setDeadline(date)}
      dateFormat={`MMMM d, YYYY   ✎`}
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
