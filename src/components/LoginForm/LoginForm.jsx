import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import styled from "./LoginForm.module.css";
import { useState } from "react";
import Icon from "../../shared/components/Icon/Icon";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Email must include one '@' and one '.' in the host part"
    )
    .required("The email field is not filled"),
  password: yup
    .string()
    .matches(
      /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
      "Password can only contain letters, numbers, and special characters"
    )
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters")
    .required("The password field is not filled")
    .test(
      "no-spaces",
      "Password cannot contain spaces",
      (value) => !/\s/.test(value)
    ),
});

const buildLinkClass = ({ isActive }) => {
  return clsx(styled.loginLink, isActive && styled.linkActive);
};

export default function LoginForm() {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => dispatch(logIn(data));

  return (
    <section className={styled.loginContainer}>
      <div className={styled.loginWrapper}>
        <form className={styled.formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <ul className={styled.loginList}>
            <li className={styled.loginItem}>
              <NavLink to="/auth/register" className={buildLinkClass}>
                Registration
              </NavLink>
            </li>
            <li className={styled.loginItem}>
              <NavLink to="/auth/login" className={buildLinkClass}>
                Log In
              </NavLink>
            </li>
          </ul>

          <input
            className={styled.loginInput}
            type="text"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <span className={styled.loginError}>{errors.email.message}</span>
          )}
          <div className={styled.passwordWrapper}>
            <input
              className={styled.loginInput}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm a password"
              {...register("password")}
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
            <span className={styled.loginError}>{errors.password.message}</span>
          )}

          <button className={styled.loginButton} type="submit">
            Log In Now
          </button>
        </form>
      </div>
    </section>
  );
}
