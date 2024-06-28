import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './EditProfileModal.module.css';
import { updateUserProfile } from '../../../redux/user/operations';
import { selectUser } from '../../../redux/user/selectors';
import { setAvatarUrl } from '../../../redux/user/operations';
import Icon from '../../../shared/components/Icon/Icon';

Modal.setAppElement('#root');

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().min(
    6,
    'Password is too short - should be 6 chars minimum.',
  ),
});

const EditProfileModal = ({ isModalOpen, closeModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const avatarIcon = user.avatarURL;
  const [showPassword, setShowPassword] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    password: '',
    avatarURL: '',
  });

  useEffect(() => {
    if (user) {
      setInitialValues({
        name: user.name || '',
        email: user.email || '',
        password: '',
        avatarURL: user.avatarURL || '',
      });
    }
  }, [user]);

  const toggleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleFormSubmit = values => {
    const updatedProfile = {
      name: values.name,
      email: values.email,
      avatarURL: avatarIcon,
    };

    if (values.password) {
      updatedProfile.password = values.password;
    }
    dispatch(updateUserProfile(updatedProfile));
    closeModal();
  };

  const handleModalClose = () => {
    closeModal();
  };

  const handleAvatarChange = event => {
    const file = event.target.files[0];
    if (file) {
      dispatch(setAvatarUrl(file));
    }
  };

  const handleAddPhotoClick = () => {
    const avatarInput = document.getElementById('avatarInput');
    if (avatarInput) {
      avatarInput.click();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleModalClose}
      contentLabel="Edit Profile"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button onClick={handleModalClose} className={styles.closeButton}>
        <Icon
          id="icon-close"
          width="16"
          height="16"
          alt="icon-close"
          className={styles.iconModal}
        />
      </button>

      <div className={styles.wrapper}>
        <h2 className={styles.name}>Edit profile</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          <Form>
            <div className={styles.avatarBox}>
              <label className={styles.avatarForm}>
                <img
                  src={user.avatarURL}
                  alt="Avatar"
                  className={styles.avatarModal}
                  width="68"
                  height="68"
                />
                <input
                  id="avatarInput"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: 'none' }}
                />
              </label>

              <button
                type="button"
                className={styles.buttonPlus}
                onClick={handleAddPhotoClick}
              >
                <Icon
                  id="icon-plus"
                  width="10"
                  height="10"
                  className={styles.iconPlus}
                  alt="icon-plus"
                />
              </button>
            </div>
            <div className={styles.boxForm}>
              <div className={styles.inputWrapper}>
                <label className={styles.fieldInput}>
                  <Field
                    type="text"
                    name="name"
                    className={styles.field}
                    autoComplete="name"
                  />
                </label>
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.inputWrapper}>
                <label className={styles.fieldInput}>
                  <Field
                    type="email"
                    name="email"
                    className={styles.field}
                    autoComplete="email"
                  />
                </label>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.inputWrapper}>
                <label className={styles.fieldInput}>
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className={styles.field}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className={styles.showPasswordButton}
                    onClick={toggleShowPassword}
                  >
                    <Icon
                      id="icon-eye"
                      width="18"
                      height="18"
                      className={styles.iconPassword}
                      alt="icon-eye"
                    />
                  </button>
                </label>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>

              <button className={styles.buttonModal} type="submit">
                <span className={styles.textBtn}>Send</span>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
