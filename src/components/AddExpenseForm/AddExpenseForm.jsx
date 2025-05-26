import s from "./AddExpenseForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { SelectStyles } from "../../utils/SelectStyles";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categories/categoriesOperation";
import { Field, Form, Formik } from "formik";

const AddExpenseForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  
  const options =
    categories.expenses?.map((cat) => ({
      value: cat._id,
      label: cat.name,
    })) || [];

  const initialValues = {
    category: null,
    summ: "",
    date: null,
    comment: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {({ setFieldValue, values }) => (
        <Form className={s.form}>
          
          <Select
            id="category"
            name="category"
            options={options}
            styles={SelectStyles}
            placeholder="Category"
            value={values.category}
            onChange={(option) => setFieldValue("category", option)}
          />

         
          <div className={s.infoFormDiv}>
            <Field
              type="text"
              name="summ"
              className={s.input}
              placeholder="0.00"
            />
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setFieldValue("date", date);
              }}
              className={s.input}
              calendarClassName={s.calendar}
            />
          </div>

         
          <Field
            type="text"
            name="comment"
            className={clsx(s.input, s.commentInput)}
            placeholder="Comment"
          />

          
          <button type="submit" className={s.addBtn}>
            Add
          </button>
          <button type="button" className={s.cancelBtn}>
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddExpenseForm;
