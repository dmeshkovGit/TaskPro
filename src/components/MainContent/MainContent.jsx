import Header from '../../components/Header/Header';
import ScreensPage from '../ScreensPage/ScreensPage';
import Filter from '../../shared/components/FilterButton/Filter';
import css from './MainContent.module.css';
import { selectBoard } from '../../redux/board/selectors';
import { useSelector } from 'react-redux';

export default function MainContent({ content, header, toggleSidebar }) {
  const currentBoard = useSelector(selectBoard);

  return (
    <div className={css.wrapper}>
      <Header toggleSidebar={toggleSidebar} />
      <ScreensPage>
        <div className={css.headerWrapper}>
          {header}
          {currentBoard && <Filter />}
        </div>
        {content}
      </ScreensPage>
    </div>
  );
}

// Прокинути toggleSidebar на бургер
