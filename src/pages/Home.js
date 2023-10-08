import { useEffect, useState } from 'react';

import styles from './Home.module.scss';
import UserCard from '../components/UserCard/UserCard';
import UserSkeletonLoading from '../components/UserCard/UserSkeletonLoading';
import Header from '../components/Header/Header';
import Filters from '../components/Filters/Filters';

const cachedData = {};

const HomePage = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [nameFilter, setFilterByName] = useState('');
  const [fromDob, setFromDob] = useState(new Date(Date.UTC(1900, 0, 1)));
  const [toDob, setToDob] = useState(new Date());

  useEffect(() => {
    const fetchUsers = async () => {

      if (cachedData['users']) {
        setUsers(cachedData['users']);
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        'https://randomuser.me/api/?results=10&nat=us&seed=072da5c0f7ce28d5'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedUsers = [];

      responseData.results.forEach((result, index) => {
        loadedUsers.push({
          index: index,
          detailed: false,
          firstname: result.name.first,
          lastname: result.name.last,
          email: result.email,
          dob: result.dob.date,
          profilePicture: result.picture.large,
        });
      });

      setUsers(loadedUsers);
      cachedData['users'] = loadedUsers;
      setIsLoading(false);
    };

    fetchUsers().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  return (
    <>
      <Header></Header>

      <Filters filterByName={setFilterByName} filterFromDob={setFromDob} filterToDob={setToDob}></Filters>
      
      {isLoading && 
        <div className={styles.flexContainer}>
          {[...Array(10)].map((e, i) => <UserSkeletonLoading key={i}></UserSkeletonLoading>)}
        </div>
      }
      {httpError && 
        <div className="error">
          {httpError}
        </div>
      }
      {!isLoading && !httpError &&
        <>
          <div className={styles.flexContainer}>
            {
              users.filter(user => 
                  (user.firstname.toLowerCase().includes(nameFilter.toLowerCase()) || user.lastname.toLowerCase().includes(nameFilter.toLowerCase()) || nameFilter === '') 
                  && 
                  (new Date(user.dob).getTime() >= fromDob.getTime() && new Date(user.dob).getTime() <= toDob.getTime())
                ).map((user) => (
                  <UserCard
                    key={user.index}
                    index={user.index + 1}
                    detailed={user.detailed}
                    firstname={user.firstname}
                    lastname={user.lastname}
                    email={user.email}
                    dob={user.dob}
                    profilePicture={user.profilePicture}
                  />
              ))
            }
          </div>
        </>
      }
    </>
  )
}

export default HomePage;