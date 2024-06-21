import { useState } from 'react';
import styles from './BurgerMenu.module.css';
import SideBar from '../../../components/SideBar/SideBar';
import Icon from '../../../shared/components/Icon/Icon';

export default function BurgerMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  const handleBackdropClick = event => {
    if (event.target.classList.contains(styles.backdrop)) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className={styles.burgerWrapper}>
      <button className={styles.burgerButton} onClick={toggleSidebar}>
        <Icon
          id="icon-burger"
          width="24"
          height="24"
          className={styles.burgerMenu}
        />
      </button>
      {isSidebarOpen && (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
          <SideBar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
      )}
    </div>
  );
}
