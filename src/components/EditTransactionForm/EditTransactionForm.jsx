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

const validationSchema = Yup.object({
  category: Yup.object().required("Category is required"),
  summ: Yup.number()
    .typeError("Must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),
  date: Yup.date().required("Date is required"),
  comment: Yup.string().max(100, "Max 100 characters"),
});

const EditTransactionForm = ({ transaction, onCancel }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const [startDate, setStartDate] = useState(new Date(transaction.date));

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryOptions =
    categories[transaction.type]?.map((cat) => ({
      value: cat._id,
      label: cat.name,
    })) || [];

  const categoryObj = categories[transaction.type]?.find(
    (cat) => cat.name === transaction.category
  );

  const initialValues = {
    category: categoryObj
      ? { value: categoryObj._id, label: categoryObj.name }
      : null,
    summ: transaction.summ,
    date: new Date(transaction.date),
    comment: transaction.comment || "",
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const updated = {
      id: transaction._id,
      transactionType: transaction.type,
      categoryId: values.category.value,
      summ: values.summ,
      date: values.date.toISOString(),
      comment: values.comment,
    };

    try {
      await dispatch(editeTransaction(updated)).unwrap();
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values, isSubmitting }) => (
        <Form className={s.form}>
          <p className={s.transactionType}>{transaction.type.toUpperCase()}</p>

          <Select
            name="category"
            options={categoryOptions}
            styles={SelectStyles}
            value={values.category}
            onChange={(option) => setFieldValue("category", option)}
            placeholder="Category"
          />
          <ErrorMessage name="category" component="div" className={s.error} />

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
              maxDate={new Date()}
              className={s.input}
              calendarClassName={s.calendar}
            />
          </div>
          <ErrorMessage name="summ" component="div" className={s.error} />
          <ErrorMessage name="date" component="div" className={s.error} />

          <Field
            type="text"
            name="comment"
            className={clsx(s.input, s.commentInput)}
            placeholder="Comment"
          />
          <ErrorMessage name="comment" component="div" className={s.error} />

          <button type="submit" disabled={isSubmitting} className={s.addBtn}>
            Save
          </button>
          <button type="button" onClick={onCancel} className={s.cancelBtn}>
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default EditTransactionForm;
