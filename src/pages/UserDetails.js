import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from '../components/Header/Header';
import styles from './Home.module.scss';
import UserCard from '../components/UserCard/UserCard';
import UserSkeletonLoading from '../components/UserCard/UserSkeletonLoading';

const UserDetails = () => {

  const params = useParams();

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchUsers = async () => {

      // Ideally I would get an ID for each user to call the API with it, but the API does not provide an ID per user so I use the index of the user in the response array instead

      const response = await fetch(
        'https://randomuser.me/api/?results=10&nat=us&seed=072da5c0f7ce28d5'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const currentUser = responseData.results[Number(params.index) - 1];

      const loadedUser = {
        index: params.index,
        detailed: true,
        firstname: currentUser.name.first,
        lastname: currentUser.name.last,
        email: currentUser.email,
        dob: currentUser.dob.date,
        profilePicture: currentUser.picture.large,
        phone: currentUser.phone,
        city: currentUser.location.city,
        country: currentUser.location.country,
        state: currentUser.location.state
      };

      setUser(loadedUser);
      setIsLoading(false);
    };

    fetchUsers().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [params]);

  return (
    <>
      <Header></Header>
      {isLoading && 
        <div className={styles.flexContainer}>
          <UserSkeletonLoading key={1}></UserSkeletonLoading>
        </div>
      }
      {httpError && 
        <div className="error">
          {httpError}
        </div>
      }
      {!isLoading && !httpError &&
        <div className={styles.flexContainer}>
          <UserCard
            key={user.index}
            index={user.index + 1}
            detailed={user.detailed}
            firstname={user.firstname}
            lastname={user.lastname}
            email={user.email}
            dob={user.dob}
            profilePicture={user.profilePicture}
            phone={user.phone}
            city={user.city}
            country={user.country}
            state={user.state}
          />
        </div>
      }
    </>
  )
}

export default UserDetails;