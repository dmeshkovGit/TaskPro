import { useState } from 'react';
import Icon from '../../shared/components/Icon/Icon';
import EditColumnModal from '../EditColumnModal/EditColumnModal';
import styles from './ToDo.module.css';
import '../../shared/styles/variables.css';

const ToDo = ({ id, title, onEditTitle, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = newTitle => {
    onEditTitle(newTitle);
    closeModal();
  };

  const handleEditClick = () => {
    openModal();
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.actions}>
        <button onClick={handleEditClick} className={styles.actionButton}>
          <Icon
            id="icon-pencil"
            width="16"
            height="16"
            className={styles.icon}
          />
        </button>
        <button onClick={handleDeleteClick} className={styles.actionButton}>
          <Icon
            id="icon-trash"
            width="16"
            height="16"
            className={styles.icon}
          />
        </button>
      </div>
      <EditColumnModal
        columnId={id}
        isOpen={isModalOpen}
        onClose={closeModal}
        title={title}
        onEditTitle={handleSave}
      />
    </div>
  );
};

export default ToDo;
