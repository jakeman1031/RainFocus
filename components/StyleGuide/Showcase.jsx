'use client';

import { useState } from 'react';
import styles from './Showcase.module.scss';

// Storybook-style preview card: a live "canvas" on top, a collapsible code
// window with copy-to-clipboard below.
export default function Showcase({ title, description, lang = 'jsx', code, padded = true, children }) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(true);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable (e.g. file:// in some browsers) — no-op */
    }
  };

  return (
    <section className={styles.showcase}>
      {(title || description) && (
        <header className={styles.head}>
          {title && <h3 className={styles.title}>{title}</h3>}
          {description && <p className={styles.desc}>{description}</p>}
        </header>
      )}

      <div className={padded ? styles.canvas : styles.canvasFlush}>{children}</div>

      {code && (
        <div className={styles.codeWrap}>
          <div className={styles.codeBar}>
            <span className={styles.lang}>{lang}</span>
            <div className={styles.actions}>
              <button type="button" className={styles.barBtn} onClick={() => setShowCode((s) => !s)}>
                {showCode ? 'Hide code' : 'Show code'}
              </button>
              <button type="button" className={styles.barBtn} onClick={copy}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          {showCode && (
            <pre className={styles.code}>
              <code>{code}</code>
            </pre>
          )}
        </div>
      )}
    </section>
  );
}
