import Icon from "../../shared/components/Icon/Icon";
import styles from "./AddCardBtn.module.css";

const AddCardBtn = ({ onClick }) => {
  return (
    <button className={styles.addButton} onClick={onClick}>
      <div className={styles.iconContainer}>
        <Icon id="icon-plus" width="16" height="16" className={styles.icon} />
      </div>
      Add another card
    </button>
  );
};

export default AddCardBtn;
