import css from './Filter.module.css';
import Icon from '../Icon/Icon';
import { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../redux/cards/slice';
import { selectCurrentFilter } from '../../../redux/cards/selectors';

const priorityOptions = [
  {
    label: 'Without priority',
    value: 'without_priority',
    className: 'withoutPriority',
  },
  { label: 'Low', value: 'low', className: 'lowPriority' },
  { label: 'Medium', value: 'medium', className: 'mediumPriority' },
  { label: 'High', value: 'high', className: 'highPriority' },
];

const validationSchema = Yup.object({
  priority: Yup.string().required('Priority is required'),
});

export default function Filter() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const currentFilter = useSelector(selectCurrentFilter);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = event => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={css.dropdown} ref={dropdownRef}>
      <button className={css.filterBtn} onClick={toggleDropdown}>
        <div className={css.titleWrapper}>
          <Icon
            id="icon-filter"
            width="24"
            height="24"
            className={css.filterIcon}
          />
          <h3 className={css.titleFilter}>Filters</h3>
        </div>
      </button>
      {isOpen && (
        <div className={css.dropdownMenu}>
          <Formik
            initialValues={{ priority: currentFilter }}
            validationSchema={validationSchema}
            onSubmit={values => {
              dispatch(setFilter(values.priority));
            }}
          >
            {({ submitForm, values }) => (
              <Form className={css.formContainer}>
                <h2 className={css.titleFilter}>Filters</h2>
                <hr className={css.line} />
                <div className={css.resetBtnWrapper}>
                  <h3 className={css.filterName}>Label color</h3>
                  <label className={clsx(css.showAll)}>
                    Show all
                    <Field
                      type="radio"
                      name="priority"
                      value="all_priority"
                      className={css.radioInput}
                      onClick={() => {
                        submitForm();
                      }}
                    />
                  </label>
                </div>
                <div role="group" aria-labelledby="priority-radio-group">
                  {priorityOptions.map(option => (
                    <label
                      key={option.value}
                      className={clsx(
                        css.radioLabel,
                        option.value === values.priority &&
                          css.checkedRadioLabel,
                      )}
                    >
                      <div
                        className={clsx(
                          css.customRadio,
                          priorityOptions.map(currentOption => {
                            if (currentOption.value === option.value) {
                              return css[option.className];
                            }
                          }),
                        )}
                      >
                        <span
                          className={clsx(
                            css.customRadioDot,
                            option.value === values.priority &&
                              css.checkedRadioDot,
                          )}
                        ></span>
                      </div>
                      <Field
                        type="radio"
                        name="priority"
                        value={option.value}
                        className={css.radioInput}
                        onClick={() => {
                          submitForm();
                        }}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </div>
  );
}
