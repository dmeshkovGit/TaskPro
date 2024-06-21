import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from './RegisterForm.module.css';
import Icon from '../../shared/components/Icon/Icon';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/operations';
import toast, { Toaster } from 'react-hot-toast';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      /^[A-Za-z0-9]+$/,
      'Name can only contain letters, numbers, and no spaces',
    )
    .min(2, 'Name must be at least 2 characters')
    .max(32, 'Name must be at most 32 characters')
    .required('The name field is not filled'),
  email: yup
    .string()
    .email('Invalid email format')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Email must include one '@' and one '.' in the host part",
    )
    .required('The email field is not filled'),
  password: yup
    .string()
    .matches(
      /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
      'Password can only contain letters, numbers, and special characters',
    )
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .required('The password field is not filled')
    .test(
      'no-spaces',
      'Password cannot contain spaces',
      value => !/\s/.test(value),
    ),
});

const buildLinkClass = ({ isActive }) => {
  return clsx(styled.registerLink, isActive && styled.linkActive);
};

export default function RegisterForm() {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async data => {
    try {
      await dispatch(registerUser(data)).unwrap();
    } catch (error) {
      const errorMessage = 'An unexpected error occurred. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <section className={styled.registerContainer}>
      <div className={styled.registerWrapper}>
        <form className={styled.formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <ul className={styled.registerList}>
            <li className={styled.registerItem}>
              <NavLink to="/auth/register" className={buildLinkClass}>
                Registration
              </NavLink>
            </li>
            <li className={styled.registerItem}>
              <NavLink to="/auth/login" className={buildLinkClass}>
                Log In
              </NavLink>
            </li>
          </ul>

          <input
            className={styled.registerInput}
            type="text"
            placeholder="Enter your name"
            {...register('name')}
          />
          {errors.name && (
            <span className={styled.registerError}>{errors.name.message}</span>
          )}

          <input
            className={styled.registerInput}
            type="text"
            placeholder="Enter your email"
            {...register('email')}
          />
          {errors.email && (
            <span className={styled.registerError}>{errors.email.message}</span>
          )}

          <div className={styled.passwordWrapper}>
            <input
              className={styled.registerInput}
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm a password"
              {...register('password')}
            />
            <span
              onClick={toggleShowPassword}
              className={styled.showPasswordButton}
            >
              <Icon
                className={styled.icon}
                id="icon-eye"
                width="18px"
                height="18px"
              />
            </span>
          </div>
          {errors.password && (
            <span className={styled.registerError}>
              {errors.password.message}
            </span>
          )}

          <button className={styled.registerButton} type="submit">
            Register Now
          </button>
        </form>

        <Toaster />
      </div>
    </section>
  );
}
