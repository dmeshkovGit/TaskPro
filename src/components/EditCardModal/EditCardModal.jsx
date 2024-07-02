import { useState } from 'react';
import Icon from '../../shared/components/Icon/Icon';
import styles from './EditCardModal.module.css';
import '../../shared/styles/variables.css';
import DatePickerCalendar from '../../shared/components/DatePickerCalendar/DatePickerCalendar';

const EditCardModal = ({ card, onEditCard, onClose }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [labelColor, setLabelColor] = useState(card.labelColor || 'without');
  const [deadline, setDeadline] = useState(new Date(card.deadline));

  const handleSubmit = e => {
    e.preventDefault();
    onEditCard({ ...card, title, description, priority: labelColor, deadline });
    onClose();
  };

  return (
    <div className={styles.addCardForm}>
      <button onClick={onClose} className={styles.closeButton}>
        <Icon id="icon-close" width="16" height="16" className={styles.icon} />
      </button>
      <div className={styles.title}>Edit card</div>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroupTitle}>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className={styles.formGroupDescription}>
          <textarea
            id="description"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroupLabelcolor}>
          <label>Label color</label>
          <div className={styles.labelColors}>
            {['low', 'medium', 'high', 'without'].map(color => (
              <label
                key={color}
                className={`${styles.labelColor} ${styles[color]} ${
                  labelColor === color ? styles.selected : ''
                }`}
              >
                <input
                  type="radio"
                  name="labelColor"
                  value={color}
                  checked={labelColor === color}
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
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditCardModal;
