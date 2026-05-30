import styles from './Button.module.scss';

// TODO (you): Reusable button. Variants spotted in the Figma file:
//   - primary  → solid purple #5C00DC, white text. Used by "Edit event".
//                Figma component "Buttons/Admin" (instance 310:304, 101×33).
//
// Suggested props: { variant?: 'primary' | 'secondary', children, ...rest }

export default function Button({ variant = 'primary', className = '', children, ...rest }) {
  const cls = [styles.btn, styles[variant], className].filter(Boolean).join(' ');
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
