import React, { useState } from 'react';
import ModalAddTransaction from '../MdlAddTransaction/ModalAddTransaction.jsx';
import styles from './ButtonAddTransaction.module.css';

const ButtonAddTransaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button className={styles.floatingButton} onClick={openModal}>
        +
      </button>
      {isModalOpen && <ModalAddTransaction onClose={closeModal} />}
    </>
  );
};

export default ButtonAddTransaction;