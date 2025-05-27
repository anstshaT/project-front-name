import { useEffect } from "react";
import s from "./ModalDeleteTransaction.module.css";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { deleteTransaction } from "../../redux/transactions/transactionsOps";
import { userInfo } from "../../redux/user/userOperations";

const ModalDeleteTransaction = ({ id, closeModal }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  const handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) closeModal();
  };
  return (
    <div onClick={handleBackdropClick} className={s.backdrop}>
      <div className={s.modal}>
        <button
          type="button"
          className={s.closeBtn}
          aria-label="Close modal"
          onClick={() => closeModal()}
        >
          {" "}
          <svg className={s.closeIcon} width="20" height="20">
            <use href="/icons.svg#icon-close" />
          </svg>
        </button>

        <div className={s.logo}>
          <svg width="54" height="54" className={s.logoIcon}>
            <use href="/icons.svg#icon-wallet"></use>
          </svg>
          <p className={s.logoText}>Spendy</p>
        </div>

        <p className={s.text}>Are you sure you want to Delete?</p>

        <button
          className={clsx(s.btn, s.delete)}
          onClick={() => {
            dispatch(deleteTransaction(id))
              .then(() => {
                dispatch(userInfo());
                closeModal();
              })
              .catch((error) => {
                console.error("Error deleting transaction:", error);
              });
          }}
        >
          Delete
        </button>
        <button className={s.btn} onClick={() => closeModal()}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalDeleteTransaction;
