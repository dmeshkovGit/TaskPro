import styles from './Bell.module.css';
import Icon from '../../shared/components/Icon/Icon';

const Bell = ({ deadline }) => {
  const isDeadline = () => {
    const today = new Date();
    const tomorrow = new Date();
    const deadlineDate = new Date(deadline);

    tomorrow.setDate(today.getDate() + 1);

    const isToday =
      today.getFullYear() === deadlineDate.getFullYear() &&
      today.getMonth() === deadlineDate.getMonth() &&
      today.getDate() === deadlineDate.getDate();

    const isTomorrow =
      tomorrow.getFullYear() === deadlineDate.getFullYear() &&
      tomorrow.getMonth() === deadlineDate.getMonth() &&
      tomorrow.getDate() === deadlineDate.getDate();

    return isToday || isTomorrow;
  };

  return (
    <div className={styles.bellContainer}>
      {isDeadline() && (
        <Icon
          id="icon-Bell-02"
          width="16"
          height="16"
          className={styles.bellIcon}
        />
      )}
    </div>
  );
};

export default Bell;
