import css from './ScrollButtomColumn.module.css';

export default function ScrollButtomColumn({ children }) {
  return <div className={css.scroll}>{children}</div>;
}
