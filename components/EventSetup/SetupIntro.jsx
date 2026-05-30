import styles from './SetupIntro.module.scss';

export default function SetupIntro() {
  return (
    <section className={styles.intro}>
      <h2 className={styles.title}>Event setup guide</h2>
      <p className={styles.desc}>
        See the available list of modules below. We suggest that you start with the attendee module.
      </p>
    </section>
  );
}
