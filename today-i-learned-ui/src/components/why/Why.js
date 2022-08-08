import styles from './Why.module.css';

function Why() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.factWrapper}>
          <header className={styles.title}>
          <h3>
            Why Spaced Repetition?
          </h3>
          </header>
          <p>
            Simply put, spaced repition works. Lorum ipsum!
          </p>
          
      </div>
    </div>
  );
}

export default Why;