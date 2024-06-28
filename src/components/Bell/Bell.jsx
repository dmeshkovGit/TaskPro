import styles from './Bell.module.css';
import Icon from '../../shared/components/Icon/Icon';

const Bell = ({ deadline }) => {
  const isDeadlineTomorrow = () => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    today.setDate(today.getDate() + 1);
    return (
      today.getFullYear() === deadlineDate.getFullYear() &&
      today.getMonth() === deadlineDate.getMonth() &&
      today.getDate() === deadlineDate.getDate()
    );
  };
  console.log('dead', deadline);
  return (
    <div className={styles.bellContainer}>
      {isDeadlineTomorrow() && (
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
