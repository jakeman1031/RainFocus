import styles from './AddWorkflowCard.module.scss';

// Empty card with a centered "+ Add Registration Workflow" action (Step 2, row 2).
export default function AddWorkflowCard({ onClick, label = 'Add Registration Workflow' }) {
  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <img className={styles.icon} src="/icons/add-circle-outline.svg" alt="" aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </button>
  );
}
