import { useSelector } from 'react-redux';
import { selectLoading } from '../../redux/board/selectors';
import css from './BoardTittle.module.css';
export default function BoardTittle({ title }) {
  const loading = useSelector(selectLoading);

  return (
    <div className={css.wrap_title}>
      <h2 className={css.title}>{loading ? 'Loading ...' : title}</h2>
    </div>
  );
}
