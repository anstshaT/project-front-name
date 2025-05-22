import React, { useEffect } from 'react';
import styles from './ModalAddTransaction.module.css';
// import AddTransactionForm from './AddTransactionForm';

const ModalAddTransaction = ({ onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
       <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <svg className={styles.closeIcon} width="16" height="16">
           <use href="/icons.svg#icon-Exit" />
          </svg>
       </button>
        <AddTransactionForm onCancel={onClose} />
      </div>
    </div>
  );
};

export default ModalAddTransaction;