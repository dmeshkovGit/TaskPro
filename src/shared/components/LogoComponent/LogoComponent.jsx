import css from "./LogoComponent.module.css";
import Icon from "../Icon/Icon";

export default function LogoComponent() {
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <Icon id="icon-logo" width="12" height="16" className={css.icon} />
      </div>
      <h1 className={css.title}>Task Pro</h1>
    </div>
  );
}
