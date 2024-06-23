import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { selectUser, selectIsLoading } from '../../../redux/user/selectors';
import styles from './UserInfo.module.css';
import md5 from 'md5';
import Loader from '../../../shared/components/Loader/Loader';

const getGravatarUrl = email => {
  const hash = email ? md5(email.trim().toLowerCase()) : '';
  return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
};

const UserInfo = ({ openModal }) => {
  const user = useSelector(selectUser);

  const loading = useSelector(selectIsLoading);
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (user && !user.avatarURL) {
      const newGravatar = getGravatarUrl(user.email);
      setAvatar(newGravatar);
    } else if (user) {
      setAvatar(user.avatarURL);
    }
  }, [user]);

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
            <img src={avatar} alt="Avatar" className={styles.avatar} />
          </>
        )
      )}
    </div>
  );
};

export default UserInfo;
