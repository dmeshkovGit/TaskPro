import { selectBoard } from '../../redux/board/selectors';
import css from './ScreensPage.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function ScreensPage({ children }) {
  const [background, setBackground] = useState('bg-1');
  const board = useSelector(selectBoard);

  useEffect(() => {
    if (board) {
      const determineBackground = () => {
        const screenWidth = window.innerWidth;
        const isRetina = window.devicePixelRatio > 1;
        let suffix = 'desktop';
        let postfix = '';

        if (screenWidth < 768) {
          suffix = 'mobile';
        } else if (screenWidth < 1024) {
          suffix = 'tablet';
        }

        if (isRetina) {
          suffix += '@2x';
          postfix += '@2x';
        }

        return `/backgrounds/${suffix}/${board.board.background}${postfix}.webp`;
      };
      setBackground(determineBackground());

      const handleResize = () => {
        setBackground(determineBackground());
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
    if (board === '') {
      setBackground('bg-1');
    }
  }, [board]);

  const style = {
    backgroundImage: `url(${background}`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
    position: 'relative',
  };
  return (
    <div className={css.wrapper} style={style}>
      {children}
    </div>
  );
}
