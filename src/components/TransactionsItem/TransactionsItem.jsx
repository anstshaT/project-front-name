import { useDispatch } from "react-redux";
import css from "./TransactionsItem.module.css";
import { MdOutlineEdit } from "react-icons/md";
import { deleteTransaction } from "../../redux/transactions/transactionsOps";
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import { useState } from "react";

const TransactionsItem = ({ transaction }) => {
  const { _id: id, date, transactionType: type, categoryId, comment, summ } = transaction;
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <li
        className={`${css.transactionItem} ${
          type === "income" ? css.incomeLine : css.expenseLine
        }`}
      >
        <div className={css.field}>
          <span className={css.label}>Date</span>
          <span className={css.value}>{date ? new Date(date).toISOString().split("T")[0] : "N/A"}</span>
        </div>

        <div className={css.field}>
          <span className={css.label}>Type</span>
          <span className={css.amount}>{type === "income" ? "+" : "-"}</span>
        </div>

        <div className={css.field}>
          <span className={css.label}>Category</span>
          <span className={css.value}>{categoryId?.name || "Unknown"}</span>
        </div>

        <div className={css.field}>
          <span className={css.label}>Comment</span>
          <span className={css.value}>{comment}</span>
        </div>

        <div className={css.field}>
          <span className={css.label}>Sum</span>
          <span
            className={`${css.value} ${type === "income" ? css.income : css.expense}`}>
            {summ}
          </span>
        </div>
        <div className={css.actions}>
          <button
            className={css.deleteBtn}
            onClick={() => {
              console.log("Deleting transaction id:", id);
              dispatch(deleteTransaction(id));
            }}
          >
            Delete
          </button>

          <button className={css.editBtn} onClick={() => setIsModalOpen(true)}>
            <MdOutlineEdit style={{ marginRight: "4px" }} />
            <span className={css.editText}>Edit</span>
          </button>
        </div>
      </li>

      {isModalOpen && (
  <ModalEditTransaction
    selectedTransaction={transaction}
    closeModal={() => setIsModalOpen(false)}
  />
)}
    </>
  );
};

export default TransactionsItem;

