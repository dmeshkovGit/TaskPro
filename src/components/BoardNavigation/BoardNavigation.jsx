import BoardCard from '../BoardCard/BoardCard';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { selectAllBoards } from '../../redux/board/selectors.js';
import css from './BoardNavigation.module.css';
import clsx from 'clsx';
// import { getBoardById } from "../../redux/board/operations.js";

const makeLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

export default function BoardNavigation({ toggleSidebar }) {
  const location = useLocation();
  const [activeBoard, setActiveBoard] = useState(null);
  const boards = useSelector(selectAllBoards);
  const navRef = useRef(null);
  // const dispatch = useDispatch();

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    if (path) {
      setActiveBoard(path);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (navRef.current) {
      const activeItem = navRef.current.querySelector(`.${css.active}`);
      if (activeItem) {
        activeItem.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [activeBoard]);

  const handleBoardClick = id => {
    const screenWidth = window.innerWidth;

    if (screenWidth < 1024) {
      toggleSidebar();
    }

    setActiveBoard(id);
    // dispatch(getBoardById(id));
  };

  return (
    <nav className={css.nav} ref={navRef}>
      <ul className={css.list}>
        {boards.map(({ icon, title, _id }) => (
          <li
            key={_id}
            onClick={() => handleBoardClick(_id)}
            className={clsx(css.boardItem, {
              [css.active]: _id === activeBoard,
            })}
          >
            <NavLink className={makeLinkClass} to={`/home/${_id}`}>
              <BoardCard
                icon={icon}
                title={title}
                id={_id}
                isActive={_id === activeBoard}
                toggleSidebar={toggleSidebar}
              />
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
