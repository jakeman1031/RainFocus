import styles from './StepRow.module.scss';

// Renders the "Step N:" label, then its card row(s) as children.
export default function StepRow({ number, title, children }) {
  return (
    <div className={styles.step}>
      <p className={styles.label}>
        <strong className={styles.stepNum}>Step {number}:</strong> {title}
      </p>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
