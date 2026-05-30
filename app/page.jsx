import styles from './page.module.scss';
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import SetupIntro from '@/components/EventSetup/SetupIntro';
import AttendeeAccordion from '@/components/Accordion/AttendeeAccordion';

export default function Page() {
  return (
    <main className={styles.shell}>
      <Sidebar />
      <div className={styles.body}>
        <Header />
        <SetupIntro />
        <AttendeeAccordion />
      </div>
    </main>
  );
}
