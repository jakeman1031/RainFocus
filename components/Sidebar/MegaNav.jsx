'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './MegaNav.module.scss';

// "Guide" is replaced by the Design System reference (top item, clickable).
// Items with a real `href` navigate; `#` items are visual placeholders.
const SECTIONS = [
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Design System', href: '/design-system' },
  {
    label: 'Attendees',
    href: '/',
    children: ['Attendees', 'Attendee types', 'Packages', 'Reg codes', 'Discounts'],
  },
  { label: 'Content', href: '#' },
  { label: 'Exhibitors', href: '#' },
];

// Normalize trailing slashes so `/design-system/` matches `/design-system`.
const normalize = (p) => (p && p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p || '/');

export default function MegaNav() {
  const current = normalize(usePathname());

  return (
    <nav className={styles.megaNav} aria-label="Sections">
      <ul className={styles.list}>
        {SECTIONS.map((section) => {
          const isLink = section.href && section.href !== '#';
          const active = isLink && normalize(section.href) === current;

          return (
            <li key={section.label}>
              <Link
                href={section.href}
                className={`${styles.item} ${active ? styles.itemActive : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <span className={styles.dot} aria-hidden="true" />
                {section.label}
              </Link>

              {section.children && (
                <ul className={styles.subList}>
                  {section.children.map((child) => (
                    <li key={child}>
                      <a href="#" className={styles.subItem}>
                        {child}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
