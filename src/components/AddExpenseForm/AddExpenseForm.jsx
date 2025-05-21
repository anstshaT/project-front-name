import s from "./AddExpenseForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import clsx from "clsx";

const AddExpenseForm = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
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
  );
};

export default AddExpenseForm;
