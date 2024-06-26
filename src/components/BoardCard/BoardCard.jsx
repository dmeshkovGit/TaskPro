import { useState } from 'react';
import Icon from '../../shared/components/Icon/Icon';
import EditBoardModal from '../EditBoardModal/EditBoardModal';
import css from './BoardCard.module.css';
import clsx from 'clsx';
import Modal from 'react-modal';
import { deleteBoard, getBoardById } from '../../redux/board/operations';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
Modal.setAppElement('#root');

export default function BoardCard({ icon, title, id, isActive }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenModal = boardId => {
    dispatch(getBoardById(boardId));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBoardDelete = () => {
    dispatch(deleteBoard(id))
      .unwrap()
      .then(() => {
        navigate('/home');
      })
      .catch(error => {
        console.error('Failed to delete board:', error);
      });
  };

  const stopPropagation = event => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <Icon
          id={icon}
          width="18"
          height="18"
          className={clsx(css.icon, isActive && css.activeIcon)}
        />
        <div className={css.cutContainer}>
          <h4 className={clsx(css.title, { [css.activeTitle]: isActive })}>
            {title}
          </h4>
        </div>
      </div>
      <div className={css.btnWrapper}>
        <button
          type="button"
          className={clsx(css.btn, { [css.activeBtn]: isActive })}
          onClick={e => {
            stopPropagation(e);
            handleOpenModal(id);
          }}
        >
          <Icon
            id="icon-pencil"
            width="16"
            height="16"
            className={css.iconBtn}
          />
        </button>
        <button
          type="button"
          onClick={e => {
            stopPropagation(e);
            handleBoardDelete();
          }}
          className={clsx(css.btn, { [css.activeBtn]: isActive })}
        >
          <Icon
            id="icon-trash"
            width="16"
            height="16"
            className={css.iconBtn}
          />
        </button>
        <Modal
          isOpen={isModalOpen}
          contentLabel="Edit Profile"
          className={css.modalWindowContent}
          overlayClassName={css.overlay}
        >
          <EditBoardModal onClose={handleCloseModal} id={id} />
        </Modal>
      </div>
    </div>
  );
}
