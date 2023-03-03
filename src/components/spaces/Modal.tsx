import { useState } from "react";

import styles from "./Modal.module.css";

interface ModalProps {
  show: boolean;
  content: string;
  close: () => void;
}

const Modal = (props: ModalProps) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>
        <h2>Your tried to reserve and ...</h2>
        <h3>{props.content}</h3>
        <button onClick={props.close}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
