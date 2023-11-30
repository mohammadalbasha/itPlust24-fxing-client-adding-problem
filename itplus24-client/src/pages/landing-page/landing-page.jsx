import { useState, useContext } from 'react';
import { Header } from '../../components/header/header';
import styles from './landing-page.module.css';
import { Outlet, Link } from 'react-router-dom';

function LandingPage() {

  return (
    <div className={styles.landingPage}>
      <Header />

      <div className={`${styles.main} `}>
        <Outlet/>
      </div>
    </div>
  );
}

export default LandingPage;

export function MainPage(){
  return <div className={`${styles.mainPage}`}>
      <div className={`${styles.greeting}`}>
            <span className={`${styles.greeting__first}`}>
            The world is
            </span>
            <span className={`${styles.greeting__second}`}>
            in your hands
            </span>
             
      </div>
      <Link
                      className={`${styles.navItem__link} `}
                      to={'geolocation'}>
                      find your location
                      <span className={`material-icons ${styles.navItem__link__arrow}`}>
                    arrow_forward
                    </span>
                    </Link>
                   
  </div>
}