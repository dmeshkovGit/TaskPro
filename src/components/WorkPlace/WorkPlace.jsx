import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './WorkPlace.module.css';
import AddColumnBtn from '../AddColumnBtn/AddColumnBtn';
import Column from '../Column/Column';
import {
  fetchColumns,
  deleteColumn,
  editColumn,
} from '../../../src/redux/column/operations';
import { selectAllColumns } from '../../../src/redux/column/selectors';
import { resetCards } from '../../redux/cards/slice';

export default function WorkPlace({ id }) {
  const dispatch = useDispatch();
  const columns = useSelector(selectAllColumns);

  useEffect(() => {
    dispatch(resetCards());
    dispatch(fetchColumns(id));
  }, [dispatch, id]);

  const handleDeleteColumn = columnId => {
    dispatch(deleteColumn(columnId));
  };

  const handleEditColumnTitle = newTitle => {
    dispatch(
      editColumn({
        title: newTitle,
      }),
    );
  };

  const boardColumns = columns.filter(column => column.boardId === id);

  return (
    <ul className={css.columns}>
      {boardColumns.length > 0 ? (
        boardColumns.map(({ _id, title, cards }) => (
          <li key={_id}>
            <Column
              id={_id}
              title={title}
              cards={cards}
              onDelete={() => handleDeleteColumn(_id)}
              onEditTitle={newTitle => handleEditColumnTitle(_id, newTitle)}
            />
          </li>
        ))
      ) : (
        <AddColumnBtn />
      )}
      {boardColumns.length > 0 && <AddColumnBtn />}
    </ul>
  );
}
