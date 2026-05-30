import styles from './AttendeeAccordion.module.scss';
import StepRow from './StepRow';
import DescriptionCard from './DescriptionCard';
import WorkflowCard from './WorkflowCard';
import AddWorkflowCard from './AddWorkflowCard';
import PortalCard from './PortalCard';

const STEP_1 = [
  { id: 'general', title: 'General', description: 'Define Attendee types & attributes' },
  { id: 'title-1', title: 'Title', description: 'Description that explains the value goes here. Description that explains the value goes here.' },
  { id: 'title-2', title: 'Title', description: 'Description that explains the value goes here. Description that explains the value goes here.' },
];

const STEP_2 = [
  { id: 'reg-1', title: 'Attendee Registration', description: 'Start by creating a general registration workflow' },
  { id: 'reg-2', title: 'Attendee Registration', description: 'Start by creating a general registration workflow' },
  { id: 'reg-3', title: 'Attendee Registration', description: 'Start by creating a general registration workflow' },
];

export default function AttendeeAccordion() {
  return (
    <section className={styles.accordion}>
      <div className={styles.header}>
        <img className={styles.personIcon} src="/icons/Person-Portal.svg" alt="" aria-hidden="true" />
        <h3 className={styles.title}>Attendee</h3>
      </div>

      <StepRow number={1} title="Base settings.">
        <div className={styles.boxed}>
          <div className="row">
            {STEP_1.map(({ id, title, description }) => (
              <div className="col-1-4" key={id ?? title}>
                <DescriptionCard title={title} description={description} />
              </div>
            ))}
          </div>
        </div>
      </StepRow>

      <StepRow number={2} title="Build registration workflows.">
        <div className="row">
          {STEP_2.map(({ id, title, description }) => (
            <div className="col-1-3" key={id ?? title}>
              <WorkflowCard iconSrc="/icons/workflow-arrow.svg" title={title} description={description} />
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-1-3">
            <AddWorkflowCard />
          </div>
        </div>
      </StepRow>

      <StepRow number={3} title="Design post-registration experiences.">
        <div className="row">
          <div className="col-1-3">
            <PortalCard />
          </div>
        </div>
      </StepRow>
    </section>
  );
}
