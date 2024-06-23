import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import BoardNavigation from '../BoardNavigation/BoardNavigation';
import LogoComponent from '../../shared/components/LogoComponent/LogoComponent';
import img from '../../../public/2.png';
import img_2x from '../../../public/2@2x.png';
import css from './SideBar.module.css';
import NeedHelpModal from '../NeedHelpModal/NeedHelpModal';
import clsx from 'clsx';
import Icon from '../../shared/components/Icon/Icon';
import NewBoardModal from '../NewBoardModal/NewBoardModal';
import { logOut } from '../../redux/auth/operations';
import { TeamPhotos } from '../TeamPhotos/TeamPhotos';

export default function SideBar({ isSidebarOpen, toggleSidebar }) {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [isOpenHelpModal, setIsOpenHelpModal] = useState(false);

  const dispatch = useDispatch();

  const handleCreateModal = useCallback(() => {
    setIsOpenCreateModal(prevState => !prevState);
  }, []);
  const handleHelpModal = useCallback(() => {
    setIsOpenHelpModal(prevState => !prevState);
  }, []);

  return (
    <>
      {isOpenCreateModal && (
        <NewBoardModal
          handleCreateModal={handleCreateModal}
          toggleSidebar={toggleSidebar}
        />
      )}
      {isOpenHelpModal && <NeedHelpModal handleHelpModal={handleHelpModal} />}
      <div className={css.backdrop}>
        <aside
          className={clsx(
            css.container,
            {
              [css.isClosed]: !isSidebarOpen,
            },
            {
              [css.backdrop]: isSidebarOpen,
            },
          )}
        >
          <LogoComponent />
          <h4 className={css.title}>My boards</h4>
          <div className={css.wrapper}>
            <p className={css.text}>Create a new board</p>
            <button
              type="button"
              onClick={handleCreateModal}
              className={css.addBtn}
            >
              <Icon
                id="icon-plus"
                width="20"
                height="20"
                className={css.iconPlus}
              />
            </button>
          </div>
          <BoardNavigation toggleSidebar={toggleSidebar} />
          <div className={css.helpWrapper}>
            <img
              className={css.img}
              srcSet={`${img} 1x, ${img_2x} 2x`}
              src={img}
              alt="Plant"
            />
            <p className={css.textHelp}>
              If you need help with <br />
              <span className={css.span}>TaskPro</span>, check out our support
              resources or <br /> reach out to our <br /> customer support team.
            </p>
            <button
              type="button"
              onClick={handleHelpModal}
              className={css.helpBtn}
            >
              <Icon
                id="icon-help"
                width="20"
                height="20"
                className={css.helpIcon}
              />
              Need help?
            </button>
          </div>
          <div className={css.logoutBox}>
            <button
              className={css.logoutBtn}
              type="button"
              onClick={() => {
                dispatch(logOut())
                  .unwrap()
                  .then()
                  .catch(() => {
                    console.error;
                  });
              }}
            >
              <Icon
                id="icon-login"
                width="32"
                height="32"
                className={css.logoutIcon}
              />
              Log out
            </button>
          </div>

          {/* <TeamPhotos /> */}
        </aside>
      </div>
    </>
  );
}
