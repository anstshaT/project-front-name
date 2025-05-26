import { useDispatch } from "react-redux";
import css from "./TransactionsItem.module.css";
import { MdOutlineEdit } from "react-icons/md";
import { deleteTransaction } from "../../redux/transactions/transactionsOps";
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import { useState } from "react";

const TransactionsItem = ({ transaction }) => {
  const { id, date, type, category, comment, sum } = transaction;
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
          <span className={css.value}>{date}</span>
        </div>

        <div className={css.field}>
          <span className={css.label}>Type</span>
          <span className={css.amount}>{type === "income" ? "+" : "-"}</span>
        </div>

        <div className={css.field}>
          <span className={css.label}>Category</span>
          <span className={css.value}>{category}</span>
        </div>

        <div className={css.field}>
          <span className={css.label}>Comment</span>
          <span className={css.value}>{comment}</span>
        </div>

        <div className={css.field}>
          <span className={css.label}>Sum</span>
          <span
            className={`${css.value} ${
              type === "income" ? css.income : css.expense
            }`}
          >
            {sum /* .toFixed(2) */}
          </span>
        </div>
        <div className={css.actions}>
          <button
            className={css.deleteBtn}
            onClick={() => dispatch(deleteTransaction(id))}
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
          transaction={transaction}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default TransactionsItem;
