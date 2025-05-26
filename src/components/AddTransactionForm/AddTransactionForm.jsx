import TransactionType from "../TransactionType/TransactionType";
import DatePicker from "react-datepicker";
import s from "./AddTransactionForm.module.css";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categories/categoriesOperation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { SelectStyles } from "../../utils/SelectStyles";
import toast from "react-hot-toast";
import { createTransaction } from "../../redux/transactions/transactionsOps";

const AddTransactionForm = ({ onCancel }) => {
  const [transactionType, setTransactionType] = useState("expense");
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    dispatch(fetchCategories());
    console.log("Categories", categories);
  }, [dispatch]);

  const options =
    categories.expenses?.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })) || [];

  const incomesOption = categories.incomes?.map((cat) => ({
    value: cat.id,
    label: cat.name,
  }));

  const initialValues = {
    transactionType: "expense",
    categoryId: null,
    summ: "",
    date: new Date(),
    comment: "",
  };

  const FeedbackSchema = Yup.object().shape({
    transactionType: Yup.string().required("Choose transaction type"),
    categoryId: Yup.mixed().required("Category is required"),
    summ: Yup.number()
      .required("Amount is required")
      .min(0.01, "Amount must be at least 0.01")
      .max(1000000, "Amount can't be more than 1000000"),
    date: Yup.date()
      .required("Date is required")
      .max(new Date(), "Date cannot be in the future"),
    comment: Yup.string().min(2, "Too short").max(192, "Too long"),
  });

  const handleSubmit = async (values, actions) => {
    console.log("Transaction Type", values);

    const newTransaction = {
      transactionType:
        values.transactionType === "incomes" ? "income" : "expense",
      categoryId:
        values.transactionType === "incomes"
          ? incomesOption.value
          : values.categoryId,
      summ: parseFloat(values.summ),
      date: values.date.toISOString().split("T")[0],
      comment: values.comment.trim(),
    };

    /* 
    if (!isValidObjectId(values.categoryId)) {
      toast.error("Невірний формат categoryId");
      return;
    } */

    try {
      await dispatch(createTransaction(newTransaction)).unwrap();
      console.log("New Transaction", newTransaction);

      actions.resetForm();
      toast.success("Transaction successfully added");
      onCancel();
    } catch (error) {
      console.log(newTransaction);

      console.log("Error in addTransaction", error);
      toast.error("Something went wrong. Try again");
    }
  };

  return (
    <div className={s.div}>
      <h1 className={s.title}>Add transaction</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        {({ setFieldValue, values, errors, touched }) => (
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
              <div className={s.selectDiv}>
                <Select
                  className={`${s.select} ${
                    errors.categoryId && touched.categoryId ? s.inputError : ""
                  }`}
                  id="category"
                  name="categoryId"
                  options={options}
                  styles={SelectStyles}
                  placeholder="Category"
                  value={values.categories}
                  onChange={(option) => {
                    console.log(option);

                    setFieldValue("categoryId", option.value);
                  }}
                />
                <ErrorMessage
                  name="categoryId"
                  component="p"
                  className={s.error}
                />
              </div>
            )}
            <div className={s.infoFormDiv}>
              <div className={s.summDiv}>
                <Field
                  type="text"
                  name="summ"
                  className={`${s.input} ${
                    errors.summ && touched.summ ? s.inputError : ""
                  }`}
                  placeholder="0.00"
                />
                <ErrorMessage name="summ" component="p" className={s.error} />
              </div>
              <div className={s.dateDiv}>
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
                <ErrorMessage name="date" component="p" className={s.error} />
              </div>
            </div>
            <div className={s.commentDiv}>
              <Field
                type="text"
                name="comment"
                className={clsx(s.input, s.commentInput, {
                  [s.inputError]: errors.comment && touched.comment,
                })}
                placeholder="Comment"
              />
              <ErrorMessage name="comment" component="p" className={s.error} />
            </div>
            <button type="submit" className={s.addBtn}>
              Add
            </button>
            <button className={s.cancelBtn} onClick={onCancel} type="button">
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTransactionForm;
