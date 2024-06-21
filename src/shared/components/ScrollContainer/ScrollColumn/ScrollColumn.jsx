import css from './ScrollColumn.module.css';

export default function ScrollColumn({ children }) {
  return <div className={css.scroll}>{children}</div>;
}
