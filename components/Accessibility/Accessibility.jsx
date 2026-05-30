'use client';

import { useState } from 'react';
import styles from './Accessibility.module.scss';

const PASSED_AUDITS = [
  '[aria-*] attributes match their roles',
  '[aria-hidden="true"] is not present on the document <body>',
  '[role]s have all required [aria-*] attributes',
  '[role] values are valid',
  '[aria-*] attributes have valid values',
  '[aria-*] attributes are valid and not misspelled',
  'Buttons have an accessible name',
  'Image elements have [alt] attributes',
  'Form elements have associated labels',
  '[user-scalable="no"] is not used in the <meta name="viewport"> element and the [maximum-scale] attribute is not less than 5.',
  "ARIA attributes are used as specified for the element's role",
  '[aria-hidden="true"] elements do not contain focusable descendents',
  'Elements use only permitted ARIA attributes',
  'Background and foreground colors have a sufficient contrast ratio',
  'Document has a <title> element',
  '<html> element has a [lang] attribute',
  '<html> element has a valid value for its [lang] attribute',
  'Links have a discernible name',
  'Lists contain only <li> elements and script supporting elements (<script> and <template>).',
  'List items (<li>) are contained within <ul>, <ol> or <menu> parent elements',
  'Touch targets have sufficient size and spacing.',
  'Heading elements appear in a sequentially-descending order',
  'Document has a main landmark.',
  'Deprecated ARIA roles were not used',
];

export default function Accessibility() {
  const [showPassed, setShowPassed] = useState(true);

  return (
    <div className={styles.page}>
      <header className={styles.scoreHead}>
        <div className={styles.gauge} role="img" aria-label="Accessibility score: 100 out of 100">
          <span className={styles.score}>100</span>
        </div>
        <h1 className={styles.title}>Accessibility</h1>
      </header>

      <p className={styles.intro}>
        These checks highlight opportunities to{' '}
        <a
          href="https://developer.chrome.com/docs/lighthouse/accessibility/scoring"
          target="_blank"
          rel="noreferrer"
        >
          improve the accessibility of your web app
        </a>
        . Automatic detection can only detect a subset of issues and does not guarantee the
        accessibility of your web app, so manual testing is also encouraged.
      </p>

      {/* ---------- Passed audits ---------- */}
      <section className={styles.group}>
        <div className={styles.groupHead}>
          <h2 className={styles.groupTitle}>Passed audits ({PASSED_AUDITS.length})</h2>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={showPassed}
            onClick={() => setShowPassed((s) => !s)}
          >
            {showPassed ? 'Hide' : 'Show'}
          </button>
        </div>

        {showPassed && (
          <ul className={`${styles.list} ${styles.groupBody}`}>
            {PASSED_AUDITS.map((item) => (
              <li key={item} className={styles.passedItem}>
                <span className={styles.check} aria-hidden="true">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
