import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Icon from '../../shared/components/Icon/Icon';
import styles from './AddCardModal.module.css';
import '../../shared/styles/variables.css';
import { useDispatch } from 'react-redux';
import { addCard } from '../../redux/cards/operations';
import DatePickerCalendar from '../../shared/components/DatePickerCalendar/DatePickerCalendar';

const AddCardModal = ({ id, onClose }) => {
  const [labelColor, setLabelColor] = useState('without');
  const [deadline, setDeadline] = useState(new Date());
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    const newCard = {
      columnId: id,
      title: e.target[0].value,
      description: e.target[1].value,
      priority: labelColor,
      deadline: e.target[6].value,
    };
    dispatch(addCard(newCard));
    onClose();
  };

  return (
    <div className={styles.addCardForm}>
      <button onClick={onClose} className={styles.closeButton}>
        <Icon id="icon-close" width="16" height="16" className={styles.icon} />
      </button>
      <div className={styles.title}>Add card</div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroupTitle}>
          <input
            type="text"
            id="title"
            placeholder="Title"
            required
            autoFocus
          />
        </div>
        <div className={styles.formGroupDescription}>
          <textarea id="description" placeholder="Description" required />
        </div>
        <div className={styles.formGroupLabelcolor}>
          <label>Label color</label>
          <div className={styles.labelColors}>
            {['low', 'medium', 'high', 'without'].map(color => (
              <label
                key={color}
                className={`${styles.priority} ${styles[color]} ${
                  labelColor === color ? styles.selected : ''
                }`}
              >
                <input
                  checked={labelColor === color}
                  value={color}
                  type="radio"
                  name="labelColor"
                  onChange={() => setLabelColor(color)}
                />
              </label>
            ))}
          </div>
        </div>
        <div className={styles.formGroupDeadline}>
          <label htmlFor="deadline">Deadline</label>
          <div className={styles.dateInput}>
            <DatePickerCalendar deadline={deadline} setDeadline={setDeadline} />
            <Icon
              id="icon-arrow-down"
              width="18"
              height="18"
              className={styles.iconArrow}
            />
          </div>
        </div>
        <button type="submit" className={styles.addButton}>
          <div className={styles.iconContainer}>
            <Icon
              id="icon-plus"
              width="16"
              height="16"
              className={styles.icon}
            />
          </div>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCardModal;
