import WorkflowCard from './WorkflowCard';

// Step 3 card — visually identical to a WorkflowCard, with the monitor icon.
export default function PortalCard({
  title = 'Attendee Portal',
  description = "Manage the portal that attendees will see after they've register for your event.",
}) {
  return (
    <WorkflowCard iconSrc="/icons/portal-monitor.svg" title={title} description={description} />
  );
}
