import clsx from "clsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import s from "./AddIncomeForm.module.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const AddIncomeForm = ({ onCancel }) => {
  const [startDate, setStartDate] = useState(new Date());

  const initialValues = {
    summ: "",
    date: null,
    comment: "",
  };

  const FeedbackSchema = Yup.object().shape({
    summ: Yup.number()
      .required("Amount is required")
      .min(0.01, "Amount must be at least 0.01")
      .max(1000000, "Amount can't be more than 1000000"),
    date: Yup.date()
      .required("Date is required")
      .max(new Date(), "Date cannot be in the future")
      .test("format", "Date must be in the format YYYY-MM-DD", (value) => {
        if (!value) return false;
        return /^\d{4}-\d{2}-\d{2}$/.test(value.toISOString().split("T")[0]);
      }),
    comment: Yup.string().min(2, "Too short").max(192, "Too long"),
  });

  const handleSubmit = (values, actions) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      {({ setFieldValue }) => (
        <Form className={s.form}>
          <div className={s.infoFormDiv}>
            <Field
              type="number"
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
              name="date"
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
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
          <button className={s.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
  /* return (
    <div>
      <form className={s.form}>
        <div className={s.infoFormDiv}>
          <input className={s.input} placeholder="0.00" />
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className={s.input}
            calendarClassName={s.calendar}
          />
        </div>
        <input
          className={clsx(s.input, s.commentInput)}
          placeholder="Comment"
        />

        <button type="submit" className={s.addBtn}>
          Add
        </button>
        <button className={s.cancelBtn}>Cancel</button>
      </form>
    </div>
  ); */
};

export default AddIncomeForm;
