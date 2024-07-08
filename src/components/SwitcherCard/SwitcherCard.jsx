import { useState, useRef, useEffect } from 'react';
import styles from './SwitcherCard.module.css';
import Icon from '../../shared/components/Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentBoard } from '../../redux/board/selectors';
import { editCard } from '../../redux/cards/operations';

const SwitcherCard = ({ card }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const currentBoard = useSelector(selectCurrentBoard);
  const columnsId = currentBoard.columns.flatMap(column => column._id);
  const currentColumnIndex = columnsId.findIndex(
    columnId => columnId === card.columnId,
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow < 100) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
  };

  const handleMoveCard = (direction = 'foward' || 'back') => {
    let newColumnId = '';
    switch (direction) {
      case 'foward':
        newColumnId = columnsId[currentColumnIndex + 1];
        break;
      case 'back':
        newColumnId = columnsId[currentColumnIndex - 1];
        break;
      default:
        break;
    }
    dispatch(
      editCard({
        cardId: card._id,
        data: {
          ...card,
          columnId: newColumnId,
        },
      }),
    );
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    handleDropdownPosition();
  }, [isOpen]);

  return (
    <div className={styles.wrapperSwitch} ref={dropdownRef}>
      <button
        className={styles.switchBtn}
        onClick={toggleDropdown}
        ref={buttonRef}
      >
        <Icon
          id="icon-arrow-circle-broken-right"
          width="16"
          height="16"
          className={styles.iconSwitch}
        />
      </button>
      {isOpen && (
        <div
          className={`${styles.dropdownMenu} ${dropUp ? styles.dropUp : ''}`}
        >
          <div className={styles.menuWrapper}>
            <button
              disabled={currentColumnIndex === columnsId.length ? true : false}
              onClick={() => {
                handleMoveCard('foward');
              }}
              className={styles.dropdownItem}
            >
              <span className={styles.textDrop}>In progress</span>
              <Icon
                id="icon-arrow-circle-broken-right"
                width="16"
                height="16"
                className={styles.iconSwitch}
              />
            </button>
            <button
              disabled={currentColumnIndex === 0 ? true : false}
              className={styles.dropdownItem}
              onClick={() => {
                handleMoveCard('back');
              }}
            >
              <span className={styles.textDrop}>Done</span>
              <Icon
                id="icon-arrow-circle-broken-right"
                width="16"
                height="16"
                className={styles.iconSwitch}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwitcherCard;
