import { useState } from 'react';

import styles from './Filters.module.scss';

const Filters = ({ filterByName, filterFromDob, filterToDob }) => {

  const [nameFilter, setNameFilter] = useState('');
  const [fromDob, setFromDob] = useState('1900-01-01');
  const [toDob, setToDob] = useState('2023-10-09');
  
  const handleNameFilterChange = (value) => {
    filterByName(value);
    setNameFilter(value);
  };

  const handleFromDobChange = (value) => {
    filterFromDob(new Date(value));
    setFromDob(value);
  };

  const handleToDobChange = (value) => {
    filterToDob(new Date(value));
    setToDob(value);
  };

  return (
    <div className={styles.filters}>

      <div className={styles.filterInput}>
        <label htmlFor="filterByName">Filter by name</label>
        <input id="filterByName"
          name="filterByName"
          type="text"
          placeholder='Filter by name'
          value={nameFilter}
          onChange={event => handleNameFilterChange(event.target.value)}
        />
      </div>


      <div className={styles.filterInput}>
        <label htmlFor="FilterFromDob">Minimum date of birth</label>
        <input id="FilterFromDob"
          name="FilterFromDob"
          type="date"
          value={fromDob}
          onChange={event => handleFromDobChange(event.target.value)}
        />
      </div>

      <div className={styles.filterInput}>
        <label htmlFor="FilterToDob">Maximum date of birth</label>
        <input id="FilterToDob"
          name="FilterToDob"
          type="date"
          value={toDob}
          onChange={event => handleToDobChange(event.target.value)}
        />
      </div>

    </div>
  );
};

export default Filters;