import { useState } from 'react';
import styles from './TeamPhotos.module.css';
import Modal from 'react-modal';
import { PhotoGallery } from './PhotoGallery';

export const TeamPhotos = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={styles['modal-wrapper']}>
      <span onClick={openModal} className={styles['team-modal']}>
        created by GoIT
      </span>

      <Modal
        className={styles.modal}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Наша команда"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#fff',
            width: '80%',
            maxWidth: '500px',
          },
        }}
      >
        <PhotoGallery />
      </Modal>
    </div>
  );
};
