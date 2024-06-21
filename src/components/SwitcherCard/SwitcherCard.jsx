import { useState, useRef, useEffect } from 'react';
import styles from './SwitcherCard.module.css';
import Icon from '../../shared/components/Icon/Icon';

const SwitcherCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.wrapperSwitch} ref={dropdownRef}>
      <button className={styles.switchBtn} onClick={toggleDropdown}>
        <Icon
          id="icon-arrow-circle-broken-right"
          width="16"
          height="16"
          className={styles.iconSwitch}
        />
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.menuWrapper}>
            <button className={styles.dropdownItem}>
              <span className={styles.textDrop}>In progress</span>
              <Icon
                id="icon-arrow-circle-broken-right"
                width="16"
                height="16"
                className={styles.iconSwitch}
              />
            </button>
            <button className={styles.dropdownItem}>
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
