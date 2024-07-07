import { selectBoard } from '../../redux/board/selectors';
import css from './ScreensPage.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { determineBackground } from './determineBackground';

export default function ScreensPage({ children }) {
  const [background, setBackground] = useState('bg-1');
  const board = useSelector(selectBoard);

  useEffect(() => {
    if (board === '') {
      setBackground('bg-1');
    }

    if (board) {
      setBackground(determineBackground(board));

      const handleResize = () => {
        setBackground(determineBackground(board));
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [board]);

  const style = {
    backgroundImage: `url(${background}`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    position: 'relative',
  };
  return (
    <div className={css.wrapper} style={style}>
      {children}
    </div>
  );
}
