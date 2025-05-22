import s from "./AddExpenseForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import clsx from "clsx";
import { SelectStyles } from "../../utils/SelectStyles";

const AddExpenseForm = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState();

  const handleSelectCategorie = (e) => {
    setSelectedCategory(e.target.value);
    console.log("Select categorie", e.target.value);
  };

  return (
    <div>
      <form className={s.form}>
        <div>
          <label htmlFor="dropdown">Category</label>
          <select
            id="dropdown"
            value={selectedCategory}
            onChange={handleSelectCategorie}
            style={SelectStyles}
          >
            <option>Main expenses</option>
            <option>Products</option>
            <option>Car</option>
            <option>Self care</option>
            <option>Child care</option>
            <option>Household products</option>
            <option>Education</option>
            <option>Leisure</option>
          </select>
        </div>
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
