import styles from './DescriptionCard.module.scss';

// Step 1 item — title + description. The surrounding border belongs to the
// boxed container in AttendeeAccordion (all three items share one border).
export default function DescriptionCard({ title, description }) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <p className={styles.desc}>{description}</p>
    </div>
  );
}
