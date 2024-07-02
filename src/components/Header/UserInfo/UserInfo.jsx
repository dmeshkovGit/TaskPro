import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectUser, selectIsLoading } from '../../../redux/user/selectors';
import styles from './UserInfo.module.css';
import md5 from 'md5';
import Loader from '../../../shared/components/Loader/Loader';
import { setAvatarUrl } from '../../../redux/user/operations';

const getGravatarUrl = email => {
  const hash = email ? md5(email.trim().toLowerCase()) : '';
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};

const UserInfo = ({ openModal }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoading);

  useEffect(() => {
    if (user && !user.avatarURL) {
      const newGravatar = getGravatarUrl(user.email);
      dispatch(setAvatarUrl(newGravatar));
    }
  }, [user, dispatch]);

  const handleOpenModal = () => {
    openModal();
  };

  return (
    <div className={styles.userInfo} onClick={handleOpenModal}>
      {loading ? (
        <Loader />
      ) : (
        user && (
          <>
            <span className={styles.nameModel}>{user.name}</span>
            <img src={user.avatarURL} alt="Avatar" className={styles.avatar} />
          </>
        )
      )}
    </div>
  );
};

export default UserInfo;
