import { useState, useEffect, useRef } from 'react';
import styles from './ThemeSwitcher.module.css';
import Icon from '../../../shared/components/Icon/Icon';
import List from '../../../shared/components/List/List';
import data from './data/theme.json';
import Theme from './Theme';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserTheme } from '../../../redux/user/operations';
import { selectUser } from '../../../redux/user/selectors';
import { setTheme } from '../../../redux/user/slice';

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const themes = [...data];
  const user = useSelector(selectUser);
  const currentTheme = user.theme; // 'light'

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

  useEffect(() => {
    if (currentTheme) {
      document.body.classList.remove(...themes);
      document.body.classList.add(currentTheme);
    }
  }, [currentTheme, themes]);

  const handleThemeChange = theme => {
    dispatch(setTheme(theme));
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
          <List className={styles.ThemeList}>
            {themes.map(item => (
              <li key={item} onClick={() => handleThemeChange(item)}>
                <Theme data={item} className={styles.themeItem} />
              </li>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
