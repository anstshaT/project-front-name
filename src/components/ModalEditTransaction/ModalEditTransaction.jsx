import { useEffect } from "react";
import css from "./ModalEditTransaction.module.css";
import EditTransactionForm from "../EditTransactionForm/EditTransactionForm";

const ModalEditTransaction = ({ closeModal, selectedTransaction }) => {
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
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeBtn}
          aria-label="Close modal"
          onClick={closeModal}
        >
          <svg className={css.closeIcon} width="20" height="20">
            <use href="/icons.svg#icon-close" />
          </svg>
        </button>
        <EditTransactionForm
          onCancel={closeModal}
          transaction={selectedTransaction}
        />
      </div>
    </div>
  );
};

export default ModalEditTransaction;
