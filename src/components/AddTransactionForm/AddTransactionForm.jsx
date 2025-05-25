import TransactionType from "../TransactionType/TransactionType";
import DatePicker from "react-datepicker";
import s from "./AddTransactionForm.module.css";
import AddIncomeForm from "../AddIncomeForm/AddIncomeForm";
import AddExpenseForm from "../AddExpenseForm/AddExpenseForm";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categories/categoriesOperation";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { SelectStyles } from "../../utils/SelectStyles";

const AddTransactionForm = ({ onCancel }) => {
  const [transactionType, setTransactionType] = useState("expense");
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const options = (categories.expenses || []).map((expense) => ({
    value: expense,
    label: expense,
  }));

  const initialValues = {
    transactionType: "expense",
    category: "",
    summ: "",
    date: null,
    comment: "",
  };

  const FeedbackSchema = Yup.object().shape({
    category: Yup.mixed()
      .required("Category is required")
      .oneOf(
        options.map((option) => option.value),
        "Please select a valid category"
      ),
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
    <div className={s.div}>
      <h1 className={s.title}>Add transaction</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        {({ setFieldValue, values }) => (
          <Form className={s.form}>
            <div className={s.toggle}>
              <p
                className={s.toggleText}
                onClick={() => {
                  setTransactionType("income");
                  setFieldValue("transactionType", "income");
                  setFieldValue("category", "Income");
                }}
              >
                Income
              </p>
              <TransactionType
                name="transactionType"
                className={s.toggle}
                transactionType={transactionType}
                setTransactionType={setTransactionType}
              />
              <p
                className={s.toggleText}
                onClick={() => {
                  setTransactionType("expense");
                  setFieldValue("transactionType", "expense");
                  setFieldValue("category", "");
                }}
              >
                Expense
              </p>
            </div>
            {transactionType === "expense" && (
              <Select
                id="category"
                name="category"
                options={options}
                styles={SelectStyles}
                placeholder="Category"
                value={values.categories}
                onChange={(option) => setFieldValue("category", option)}
              />
            )}
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
                name="date"
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
    </div>
  );
};

export default AddTransactionForm;
