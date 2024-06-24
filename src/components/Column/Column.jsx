import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import ToDo from '../ToDo/ToDo';
import CardTask from '../CardTask/CardTask';
import AddCardBtn from '../AddCardBtn/AddCardBtn';
import AddCardModal from '../AddCardModal/AddCardModal';
import EditCardModal from '../EditCardModal/EditCardModal';
import styles from './Column.module.css';
import { editCard, fetchAllCards } from '../../redux/cards/operations';
import { selectFilteredCards } from '../../redux/cards/selectors';
import ScrollColumn from '../../shared/components/ScrollContainer/ScrollColumn/ScrollColumn';
import ScrollButtomColumn from '../../shared/components/ScrollContainer/ScrollButtomColumn/ScrollButtomColum';

const Column = ({ id, title, onDelete }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    dispatch(fetchAllCards(id));
  }, [dispatch, id]);

  const filteredCards = useSelector(selectFilteredCards);

  const handleEditCard = updatedCard => {
    dispatch(editCard({ cardId: updatedCard._id, data: updatedCard }));
    setIsEditModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openEditModal = card => {
    setCurrentCard(card);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentCard(null);
  };

  return (
    <div className={styles.column}>
      <ToDo id={id} title={title} onDelete={onDelete} />
      <div className={styles.cardsScroll}>
        <div className={styles.cards}>
          {filteredCards.map(card => {
            if (id === card.columnId) {
              return (
                <CardTask
                  key={card._id}
                  card={card}
                  onEdit={() => openEditModal(card)}
                />
              );
            }
          })}
        </div>
      </div>

      <AddCardBtn onClick={openModal} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Card Modal"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <AddCardModal id={id} onClose={closeModal} />
      </Modal>
      {currentCard && (
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          contentLabel="Edit Card Modal"
          className={styles.modal}
          overlayClassName={styles.overlay}
        >
          <EditCardModal
            card={currentCard}
            onEditCard={handleEditCard}
            onClose={closeEditModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Column;
