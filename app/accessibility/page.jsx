import styles from '../page.module.scss';
import Sidebar from '@/components/Sidebar/Sidebar';
import Accessibility from '@/components/Accessibility/Accessibility';

export const metadata = {
  title: 'Accessibility · RainFocus Summit — Jake Arciniega',
  description: 'Accessibility report — score and audit checklist.',
};

export default function AccessibilityPage() {
  return (
    <main className={styles.shell}>
      <Sidebar />
      <div className={styles.body}>
        <Accessibility />
      </div>
    </main>
  );
}
