'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Sidebar.module.scss';
import MegaNav from './MegaNav';

export default function Sidebar() {
  // null  = follow the responsive default (expanded above 992px, collapsed at/below)
  // true  = user explicitly opened it
  // false = user explicitly collapsed it
  const [open, setOpen] = useState(null);
  const asideRef = useRef(null);

  const toggle = () =>
    setOpen((prev) => {
      if (prev === null) {
        // First click: flip whatever the breakpoint is currently showing.
        // collapsed-by-default (≤992) → open; expanded-by-default (>992) → close.
        return window.matchMedia('(max-width: 992px)').matches;
      }
      return !prev;
    });

  // Close the menu when clicking outside it — only while it's explicitly open
  // AND only at/below 992px. On wider screens the menu stays put when clicking
  // elsewhere, so the persistent desktop default isn't disrupted.
  useEffect(() => {
    if (open !== true) return;
    const handlePointerDown = (e) => {
      if (window.innerWidth > 992) return;
      if (asideRef.current && !asideRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  const sidebarClass = [
    styles.sidebar,
    open === true && styles.open,
    open === false && styles.closed,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <aside ref={asideRef} className={sidebarClass} aria-label="Primary navigation">
      {/* Outer rail: a vertical column on desktop, a horizontal top bar at
          ≤992px. rf logo (far left) toggles the nav; on the bar the summit
          logo + account avatar cluster to the far right, summit then avatar.
          DOM order (rf → summit → avatar) reads correctly in both layouts. */}
      <div className={styles.rail}>
        <button
          type="button"
          className={styles.brandLogo}
          onClick={toggle}
          aria-expanded={open === true}
          aria-controls="sidebar-nav"
          aria-label="Toggle navigation"
        >
          <img src="/icons/rf-logo.svg" alt="RainFocus" width={48} />
        </button>

        <span className={styles.orgLogo}>
          <img src="/images/summit-logo-small.png" alt="RainFocus Summit" />
        </span>

        <span className={styles.avatar} aria-label="Your account">
          FL
        </span>
      </div>

      {/* Inner column: event context, search, section navigation */}
      <div className={styles.inner} id="sidebar-nav">
        <div className={styles.eventHeader}>
          <p className={styles.eventTitle}>RainFocus Summit</p>
        </div>

        <p className={styles.eventDetails}>
          <span>Lehi, UT</span>
          <span className={styles.separator} aria-hidden="true">•</span>
          <span>December 15th</span>
        </p>

        <div className={styles.searchWrap}>
          <div className={styles.search}>
            <img src="/icons/search.svg" alt="" aria-hidden="true" />
            <input type="search" placeholder="Search" aria-label="Search" />
          </div>
        </div>

        <MegaNav />
      </div>
    </aside>
  );
}
