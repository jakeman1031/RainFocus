import styles from './Header.module.scss';
import Button from '@/components/Button/Button';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/images/summit-logo.png" alt="RainFocus Summit"  />
      </div>

      <div className={styles.titleBlock}>
        <h1 className={styles.title}>RainFocus Summit</h1>
        <div className={styles.meta}>
          <p>December 15th</p>
          <p>Lehi, Utah</p>
        </div>
      </div>

      <Button variant="primary" className={styles.action}>
        Edit event
      </Button>
    </header>
  );
}
