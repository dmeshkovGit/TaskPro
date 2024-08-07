import { useCallback, useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Icon from '../../shared/components/Icon/Icon';
import styles from './AddCardModal.module.css';
import '../../shared/styles/variables.css';
import { useDispatch } from 'react-redux';
import { addCard } from '../../redux/cards/operations';
import DatePickerCalendar from '../../shared/components/DatePickerCalendar/DatePickerCalendar';
import clsx from 'clsx';

const AddCardModal = ({ id, onClose }) => {
  const [labelColor, setLabelColor] = useState('without');
  const [deadline, setDeadline] = useState(new Date());
  const dispatch = useDispatch();

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();

      // Перевірка наявності референсів перед доступом до них
      if (!titleRef.current || !descriptionRef.current) {
        console.error('titleRef or descriptionRef is not assigned yet');
        return;
      }

      const newCard = {
        columnId: id,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        priority: labelColor,
        deadline,
      };

      try {
        await dispatch(addCard(newCard));
        onClose();
      } catch (error) {
        console.error('Failed to add card:', error);
      }
    },
    [id, labelColor, deadline, dispatch, onClose],
  );

  const handleLabelColorChange = useCallback(color => {
    setLabelColor(color);
  }, []);

  return (
    <div className={styles.addCardForm}>
      <button
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Close modal"
      >
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
            ref={titleRef}
            aria-label="Title"
          />
        </div>
        <div className={styles.formGroupDescription}>
          <textarea
            id="description"
            ref={descriptionRef}
            placeholder="Description"
            required
            aria-label="Description"
          />
        </div>
        <div className={styles.formGroupLabelcolor}>
          <label>Label color</label>
          <div className={styles.labelColors}>
            {['low', 'medium', 'high', 'without'].map(color => (
              <label
                key={color}
                className={clsx(
                  styles.labelColor,
                  styles[color],
                  labelColor === color && styles.selected,
                )}
              >
                <span
                  className={clsx(
                    styles.customRadioDot,
                    styles[color],
                    labelColor === color && styles.selected,
                  )}
                ></span>
                <input
                  checked={labelColor === color}
                  value={color}
                  type="radio"
                  name="labelColor"
                  onChange={() => handleLabelColorChange(color)}
                  aria-label={`Label color ${color}`}
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
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCardModal;
