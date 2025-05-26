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
import { editeTransaction } from "../../redux/transactions/transactionsOps";
//import { updateBalance } from "../../redux/balance/balanceSlice";
import { SelectStyles } from "../../utils/SelectStyles";
import TransactionType from "../TransactionType/TransactionType";

const validationSchema = Yup.object({
  category: Yup.object().when("type", {
    is: "expense",
    then: Yup.object().required("Category is required"),
    otherwise: Yup.mixed().notRequired(),
  }),
  summ: Yup.number()
    .typeError("Must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required")
    .test(
      "max-decimals",
      "Use up to 2 decimals (e.g., 650.00)",
      (value) =>
        value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString())
    ),
  date: Yup.date()
    .required("Date is required")
    .max(new Date(), "Cannot be in the future"),
  comment: Yup.string().max(100, "Max 100 characters"),
});

const EditTransactionForm = ({ transaction, onCancel }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [startDate, setStartDate] = useState(new Date(transaction.date));

  useEffect(() => {
    dispatch(fetchCategories(transaction.type));
  }, [dispatch, transaction.type]);

  const categoryOptions =
    categories[transaction.type]?.map((cat) => ({
      value: cat._id,
      label: cat.name,
    })) || [];

  const categoryObj = categories[transaction.type]?.find(
    (cat) => cat.name === transaction.category
  );

  const initialValues = {
    type: transaction.type,
    category: categoryObj
      ? { value: categoryObj._id, label: categoryObj.name }
      : null,
    summ: transaction.summ,
    date: new Date(transaction.date),
    comment: transaction.comment || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const updatedData = {
      id: transaction._id,
      transactionType: transaction.type,
      categoryId: values.category?.value || null,
      summ: values.summ,
      date: values.date.toISOString(),
      comment: values.comment,
    };

    const changedFields = {};
    if (updatedData.categoryId !== transaction.categoryId)
      changedFields.categoryId = updatedData.categoryId;
    if (updatedData.summ !== transaction.summ)
      changedFields.summ = updatedData.summ;
    if (updatedData.comment !== transaction.comment)
      changedFields.comment = updatedData.comment;
    if (
      new Date(updatedData.date).toISOString() !==
      new Date(transaction.date).toISOString()
    )
      changedFields.date = updatedData.date;

    if (Object.keys(changedFields).length === 0) {
      toast("Nothing changed");
      setSubmitting(false);
      return;
    }

    try {
      await dispatch(
        editeTransaction({ id: transaction._id, ...changedFields })
      ).unwrap();
      // dispatch(updateBalance());
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
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched, isSubmitting }) => (
          <Form className={s.form}>
            <div className={s.toggle}>
              <p className={s.toggleText}>Income</p>

              <TransactionType
                transactionType={transaction.type}
                disabled={true}
              />

              <p className={s.toggleText}>Expense</p>
            </div>

            {transaction.type === "expense" && (
              <div className={s.selectDiv}>
                <Select
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
                  type="text"
                  name="summ"
                  className={clsx(s.input, {
                    [s.inputError]: errors.summ && touched.summ,
                  })}
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
                  maxDate={new Date()}
                  className={s.input}
                  calendarClassName={s.calendar}
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
