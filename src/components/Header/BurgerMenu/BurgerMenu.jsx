import styles from './BurgerMenu.module.css';
import Icon from '../../../shared/components/Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../../redux/sidebar/slice';
import { selectSidebar } from '../../../redux/sidebar/selectors';

export default function BurgerMenu() {
  const dispatch = useDispatch();
  const sidebar = useSelector(selectSidebar);

  const handleClick = () => {
    dispatch(toggleSidebar());
  };
  const screenWidth = window.innerWidth;

  return (
    <div className={styles.burgerWrapper}>
      <button className={styles.burgerButton} onClick={handleClick}>
        <Icon
          id="icon-burger"
          width="24"
          height="24"
          className={styles.burgerMenu}
        />
      </button>
      {sidebar && screenWidth < 1024 && (
        <div className={styles.backdrop} onClick={handleClick}></div>
      )}
    </div>
  );
}
