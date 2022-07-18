import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.factWrapper}>
          <header className={styles.title}>
          <p>
            Spaced repetition, baby!
          </p>
          </header>
</div>
    </div>
  );
}

export default Home;