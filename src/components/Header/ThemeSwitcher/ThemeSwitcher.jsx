import { useState, useEffect, useRef } from 'react';
import styles from './ThemeSwitcher.module.css';
import Icon from '../../../shared/components/Icon/Icon';
import { useDispatch } from 'react-redux';
import { updateUserTheme } from '../../../redux/user/operations';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const themes = ['Dark', 'Light', 'Violet'];

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

  const handleThemeChange = theme => {
    dispatch(updateUserTheme(theme));
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button onClick={toggleDropdown} className={styles.themeBtn}>
        <p className={styles.titleTheme}>Theme</p>
        <Icon
          id="icon-arrow-down"
          width="16"
          height="16"
          className={styles.icon}
        />
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <ul className={styles.ThemeList}>
            {themes.map(item => (
              <li
                className={styles.themeItem}
                key={item}
                onClick={() => handleThemeChange(item.toLowerCase())}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
