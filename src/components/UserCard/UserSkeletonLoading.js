import styles from './UserCard.module.scss';

const UserSkeletonLoading = () => {
  return (
    <div className={styles.card}>
      <div className={styles.picture}>
        <div className={styles.skeletonRound}></div>
      </div>
      <div className={styles.infos}>
        <div className={`${styles.skeletonLine} ${styles.small}`}></div>
        <div className={`${styles.skeletonLine} ${styles.big}`}></div>
        <div className={`${styles.skeletonLine} ${styles.big}`}></div>
      </div>
    </div>
  );
};

export default UserSkeletonLoading;