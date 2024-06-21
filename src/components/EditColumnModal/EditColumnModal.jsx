import Modal from "react-modal";
import Icon from "../../shared/components/Icon/Icon";
import styles from "./EditColumnModal.module.css";
import { useDispatch } from "react-redux";
import { editColumn } from "../../redux/column/operations";

const EditColumnModal = ({ columnId, isOpen, onClose, title }) => {
  const dispatch = useDispatch();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Title Modal"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button onClick={onClose} className={styles.closeButton}>
        <Icon id="icon-close" width="16" height="16" className={styles.icon} />
      </button>
      <div className={styles.title}>Edit column</div>
      <form
        onSubmit={(e) => {
          console.log(columnId);
          e.preventDefault();
          const data = { title: e.target[0].value };
          dispatch(editColumn({ columnId, data }));
          onClose();
        }}
      >
        <input
          type="text"
          defaultValue={title}
          placeholder="New Title"
          className={styles.input}
          autoFocus
        />
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
    </Modal>
  );
};

export default EditColumnModal;
