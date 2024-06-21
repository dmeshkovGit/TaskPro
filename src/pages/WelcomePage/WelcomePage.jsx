import { Link } from "react-router-dom";
import css from "./WelcomePage.module.css";
import Icon from "../../shared/components/Icon/Icon";

import desktopImg from "../../../public/welcome-boy-desktop.png";
import desktopImg2x from "../../../public/welcome-boy-desktop@2x.png";
import mobileImg from "../../../public/welcome-boy-mobile.png";
import mobileImg2x from "../../../public/welcome-boy-mobile@2x.png";

export default function WelcomePage() {
  return (
    <div className={css.container}>
      <div className={css.imgTitleTextContainer}>
        <div className={css.imgContainer}>
          <picture>
            <source
              srcSet={`${mobileImg} 1x, ${mobileImg2x} 2x`}
              media="(max-width: 767px)"
            />
            <source
              srcSet={`${desktopImg} 1x, ${desktopImg2x} 2x`}
              media="(min-width: 768px)"
            />
            <img className={css.image} src={mobileImg} alt="Welcome" />
          </picture>
          <div className={css.logotype}>
            <div className={css.wrapper}>
              <Icon id="icon-logo" className={css.icon} />
            </div>

            <h1 className={css.title}>Task Pro</h1>
          </div>
        </div>
        <p className={css.text}>
          Supercharge your productivity and take control of your tasks with Task
          <br />
          Pro - Don't wait, start achieving your goals now!
        </p>
      </div>
      <div className={css.linkContainer}>
        <Link className={css.registration} to="/auth/register">
          Registration
        </Link>
        <Link className={css.login} to="/auth/login">
          Log In
        </Link>
      </div>
    </div>
  );
}
