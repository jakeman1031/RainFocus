import styles from '../page.module.scss';
import Sidebar from '@/components/Sidebar/Sidebar';
import StyleGuide from '@/components/StyleGuide/StyleGuide';

export const metadata = {
  title: 'Design System · RainFocus Summit — Jake Arciniega',
  description: 'Design system reference — tokens, type scale, grid, and components.',
};

export default function DesignSystemPage() {
  return (
    <main className={styles.shell}>
      <Sidebar />
      <div className={styles.body}>
        <StyleGuide />
      </div>
    </main>
  );
}
