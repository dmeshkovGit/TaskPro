import Icon from '../../shared/components/Icon/Icon';
import styles from './CardTask.module.css';
import '../../shared/styles/variables.css';
import { useDispatch } from 'react-redux';
import { deleteCard } from '../../redux/cards/operations';
import SwitcherCard from '../SwitcherCard/SwitcherCard';
import Bell from '../Bell/Bell';

function handleCutText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength).trim() + '...';
}

export default function CardTask({ onEdit, card }) {
  const dispatch = useDispatch();
  const handleRemoveCard = cardId => {
    dispatch(deleteCard(cardId));
  };

  return (
    <div className={`${styles.card} ${styles[card.priority]}`}>
      <div className={styles.headerWrap}>
        <p className={styles.header}>{card.title}</p>
      </div>
      <div className={styles.descriptionWrap}>
        <p className={styles.description}>
          {handleCutText(card.description, 85)}
        </p>
      </div>

      <div className={styles.footer}>
        <div className={styles.containerPriorityDeadline}>
          <div className={styles.priority}>
            <span className={styles.priorityLabel}>Priority</span>
            <div className={styles.priorityContainer}>
              <span
                className={`${styles.priorityColor} ${styles[card.priority]}`}
              ></span>
              <span className={styles.priorityText}>{card.priority}</span>
            </div>
          </div>
          <div className={styles.deadline}>
            <span className={styles.deadlineLabel}>Deadline</span>
            <span className={styles.deadlineValue}>
              {new Date(card.deadline)
                .toLocaleDateString('en-GB')
                .replace(/\./g, '/')}
            </span>
          </div>
        </div>
        <div className={styles.actions}>
          <Bell deadline={card.deadline} />
          <SwitcherCard />
          <button className={styles.actionButton} onClick={onEdit}>
            <Icon
              id="icon-pencil"
              width="16"
              height="16"
              className={styles.icon}
            />
          </button>
          <button
            className={styles.actionButton}
            onClick={() => {
              handleRemoveCard(card._id);
            }}
          >
            <Icon
              id="icon-trash"
              width="16"
              height="16"
              className={styles.icon}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
