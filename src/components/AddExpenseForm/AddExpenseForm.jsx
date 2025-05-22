import s from "./AddExpenseForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import clsx from "clsx";
import { SelectStyles } from "../../utils/SelectStyles";
import Select from "react-select";

const AddExpenseForm = () => {
  const [startDate, setStartDate] = useState(new Date());

  const options = [
    { value: "main expenses", label: "Main expenses" },
    { value: "products", label: "Products" },
    { value: "car", label: "Car" },
    { value: "self care", label: "Self care" },
    { value: "child care", label: "Child care" },
    { value: "household products", label: "Household products" },
    { value: "education", label: "Education" },
    { value: "leisure", label: "Leisure" },
  ];

  return (
    <div>
      <form className={s.form}>
        <Select options={options} styles={SelectStyles} />
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
  );
};

export default AddExpenseForm;
