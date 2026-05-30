import styles from './WorkflowCard.module.scss';

// Bordered card used by Step 2 (and reused by PortalCard for Step 3).
export default function WorkflowCard({ iconSrc, iconAlt = '', title, description }) {
  return (
    <article className={styles.card}>
      <div className={styles.heading}>
        {iconSrc && <img className={styles.icon} src={iconSrc} alt={iconAlt} aria-hidden={!iconAlt} />}
        <p className={styles.title}>{title}</p>
      </div>
      <p className={styles.desc}>{description}</p>
    </article>
  );
}
