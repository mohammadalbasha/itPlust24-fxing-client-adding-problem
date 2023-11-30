import { React, useContext } from 'react';
import styles from './header.module.css';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  const navToMain = () => {
    navigate('/')
  }
  navToMain
  return (
    <section className={`${styles.header }`}>
     <div onClick={navToMain} className={`${styles.logoContainer}`}>
        <img src="https://it-plus24.com/img/logo/logo-light.png" className={`${styles.logoContainer}`}/>
     </div>
    </section>
  );
}
