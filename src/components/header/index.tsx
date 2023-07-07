import styles from "./styles.module.scss";
import Modal from "react-modal";
import { useState } from 'react';
import  {register}  from "@/utils/register";


export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const Register =  register()
  function modalOpen() {
    setIsOpen(true);
  }

  function modalClose() {
    setIsOpen(false);
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="logo.png" alt="Minha logo" />
        </div>

        <nav className={styles.nav}>
          <button onClick={modalOpen}>Cadastrar</button>
        </nav>
      </header>
      
      <Modal style={{overlay:{
        backgroundColor: 'rgba(0, 0 ,0, 0.2)'
      }}}isOpen={isOpen} onRequestClose={modalClose} className={styles.modal}>
        {Register}
      </Modal>
    </>
  );
}
