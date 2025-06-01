import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import DatePicker from "react-datepicker";
import clsx from "clsx";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";

import s from "./EditTransactionForm.module.css";
import { fetchCategories } from "../../redux/categories/categoriesOperation";
import {
  editeTransaction,
  fetchTransactions,
} from "../../redux/transactions/transactionsOps";
import { SelectStyles } from "../../utils/SelectStyles";
import TransactionType from "../TransactionType/TransactionType";
import { userInfo } from "../../redux/user/userOperations";

const getValidationSchema = (values) => {
  return Yup.object({
    transactionType: Yup.string().required(),
    category:
      values.transactionType === "expense"
        ? Yup.object({
            value: Yup.string().required("Category is required"),
            label: Yup.string().required("Category label is required"),
          }).required("Category is required")
        : Yup.mixed().notRequired(),
    summ: Yup.number()
      .typeError("Must be a number")
      .positive("Amount must be greater than 0")
      .required("Amount is required")
      .test("max-decimals", "Use up to 2 decimals", (value) =>
        /^\d+(\.\d{1,2})?$/.test(value?.toString() ?? "")
      ),
    date: Yup.date()
      .required("Date is required")
      .max(new Date(), "Cannot be in the future"),
    comment: Yup.string().max(27, "Max 27 characters"),
  });
};

const EditTransactionForm = ({ transaction, onCancel }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [startDate, setStartDate] = useState(new Date(transaction.date));

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (!categories || !categories.expenses) {
    return <p>Loading...</p>;
  }

  const categoryOptions =
    categories.expenses?.map((cat) => ({
      value: cat.id,
      label: cat.name,
    })) || [];

  const categoryObj =
    transaction.transactionType === "expense"
      ? categories.expenses?.find(
          (cat) => cat.id === transaction.categoryId._id
        )
      : null;

  /* console.log("categoryObj", categoryObj); */
  /*  console.log("Transaction type", transaction.transactionType);
  console.log("Categories expenses:", categories.expenses);
  console.log("Transaction categoryId:", transaction.categoryId); */

  const initialValues = {
    transactionType: transaction.transactionType,
    category: categoryObj
      ? { value: categoryObj.id, label: categoryObj.name }
      : null,
    summ: transaction.summ,
    date: new Date(transaction.date),
    comment: transaction.comment || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const changedFields = {
      transactionType: values.transactionType,
    };

    const currentCategoryId =
      transaction.transactionType === "expense"
        ? categories.expenses?.find((cat) => cat.name === transaction.category)
            ?.id
        : null;

    if (
      values.transactionType === "expense" &&
      values.category?.value &&
      values.category.value !== currentCategoryId
    ) {
      changedFields.categoryId = values.category.value;
    }

    if (values.summ !== transaction.summ) {
      changedFields.summ = Number(values.summ); // ensure it's a number
    }

    if (values.comment !== transaction.comment) {
      changedFields.comment = values.comment;
    }

    const newDateISO = values.date.toISOString();
    const oldDateISO = new Date(transaction.date).toISOString();
    if (newDateISO !== oldDateISO) {
      changedFields.date = newDateISO;
    }

    if (Object.keys(changedFields).length === 1) {
      // only transactionType was added
      toast("Nothing changed");
      setSubmitting(false);
      return;
    }

    const patchData = {
      _id: transaction._id,
      ...changedFields,
    };

    try {
      await dispatch(editeTransaction(patchData)).unwrap();

      dispatch(fetchTransactions());
      dispatch(userInfo());

      toast.success("Transaction updated!");
      onCancel();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update transaction");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={s.div}>
      <h1 className={s.title}>Edit transaction</h1>
      <Formik
        initialValues={initialValues}
        validateOnChange={true}
        validateOnBlur={true}
        validationSchema={(values) => getValidationSchema(values || {})}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched, isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.toggle}>
              <p className={s.toggleText}>Income</p>
              <TransactionType
                transactionType={values.transactionType}
                disabled={true}
              />
              <p className={s.toggleText}>Expense</p>
            </div>

            {values.transactionType === "expense" && (
              <div className={s.selectDiv}>
                <Select
                  className={s.select}
                  name="category"
                  options={categoryOptions}
                  styles={SelectStyles}
                  value={values.category}
                  onChange={(option) => setFieldValue("category", option)}
                  placeholder="Category"
                />
                <ErrorMessage
                  name="category"
                  component="div"
                  className={s.error}
                />
              </div>
            )}

            <div className={s.infoFormDiv}>
              <div className={s.summDiv}>
                <Field
                  type="number"
                  name="summ"
                  className={clsx(s.input, {
                    [s.inputError]: errors.summ && touched.summ,
                  })}
                  placeholder="0.00"
                />
                <ErrorMessage name="summ" component="p" className={s.error} />
              </div>

              <div className={s.dateDiv}>
                <div className={s.datePickerWrapper}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setFieldValue("date", date);
                    }}
                    maxDate={new Date()}
                    className={s.input}
                    calendarClassName={s.calendar}
                    dateFormat="dd.MM.yyyy"
                  />
                  <svg width="24" height="24" className={s.icon}>
                    <use href="/icons.svg#icon-date-range"></use>
                  </svg>
                </div>
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

            <button type="submit" disabled={isSubmitting} className={s.addBtn}>
              Save
            </button>
            <button type="button" onClick={onCancel} className={s.cancelBtn}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditTransactionForm;
