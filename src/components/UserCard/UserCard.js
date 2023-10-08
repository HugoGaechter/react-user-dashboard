import { Link } from 'react-router-dom';

import styles from './UserCard.module.scss';

const UserCard = (props) => {

  const index = props.index;
  const detailed = props.detailed;
  const firstname = props.firstname;
  const lastname = props.lastname;
  const email = props.email;
  const dob = new Date(props.dob);
  const profilePicture = props.profilePicture;
  
  const phone = props.phone;
  const city = props.city;
  const country = props.country;
  const state = props.state;

  return (
    <div className={styles.card}>
      <div className={styles.background}>
        {/* Ideally this picture would come from the API to be user specific, I took a picture from the web so the design is complete */}
        <img className={styles.image} src="https://images.unsplash.com/photo-1636837955417-2d8a4e49368f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" alt='Background' loading="lazy"></img>
      </div>
      <div className={styles.picture}>
        <img className={styles.image} src={profilePicture} alt='Profile' loading="lazy"></img>
      </div>
      <div className={styles.infos}>
        <p className={styles.name}>{firstname} {lastname}</p>
        <p className={styles.small}>{email}</p>
        <p className={styles.small}>Born {dob.toLocaleDateString("en-GB")}</p>
        {
          detailed &&
          <>
            <p className={styles.small}>{phone}</p>
            <p className={styles.small}>Located in {city}, {state}, {country}</p>
          </>
        }
      </div>
      {!detailed && <Link to={`/user/${index}`} className={styles.button}>View details</Link>}
    </div>
  );
};

export default UserCard;