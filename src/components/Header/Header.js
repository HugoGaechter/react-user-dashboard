import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import styles from './Header.module.scss';
import { ReactComponent as BackButtonSvg } from './../../assets/back-button.svg';

const Header = () => {
  
  const [hasBackArrow, setBackArrow] = useState(false);

  const location = useLocation();
  useEffect(() => {
    (location.pathname.startsWith('/user')) ? setBackArrow(true) : setBackArrow(false);
  }, [location]);

  const navigate = useNavigate();

  return (
    <header>
      {(hasBackArrow) 
        ?
        <div className={styles.gutter} onClick={() => navigate(-1)}>
          <BackButtonSvg />
        </div>
        :
        <div className={styles.gutter}>
        </div>
      }
      <h1>User Dashboard</h1>
      <div className={styles.gutter}>
      </div>
    </header>
  );
};

export default Header;