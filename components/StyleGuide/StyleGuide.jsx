import styles from './StyleGuide.module.scss';
import Showcase from './Showcase';
import Button from '@/components/Button/Button';

// ---------------------------------------------------------------------------
// Token data — mirrors styles/_variables.scss and styles/_grid.scss so the
// page stays a faithful, browsable reference for the design system.
// ---------------------------------------------------------------------------

const COLOR_GROUPS = [
  {
    group: 'Brand',
    items: [
      { name: '$rf-brand-primary', hex: '#5C00DC', note: 'Primary purple — Edit event button, active "Attendees" nav, links' },
      { name: '$rf-brand-pink', hex: '#ED1A5D', note: 'rf logo' },
      { name: '$rf-brand-berry', hex: '#E71356', note: 'Attendee person icon' },
      { name: '$rf-brand-grape-3', hex: '#AB99FF', note: 'Attendee portal accent (light purple shadow)' },
    ],
  },
  {
    group: 'Surface & border',
    items: [
      { name: '$rf-color-surface', hex: '#FFFFFF', note: 'Card / sidebar background' },
      { name: '$rf-color-border', hex: '#CBC6DE', note: 'Card borders, dividers' },
    ],
  },
  {
    group: 'Text',
    items: [
      { name: '$rf-color-text-header', hex: '#222222', note: 'H1/H2/H3, bold labels' },
      { name: '$rf-color-text-body', hex: '#393551', note: 'Body paragraphs' },
      { name: '$rf-color-text-g3', hex: '#444444', note: 'Mid-emphasis text' },
      { name: '$rf-color-text-g4', hex: '#767676', note: 'Low-emphasis text (Lehi, UT • date)' },
      { name: '$rf-button-on-primary', hex: '#FFFFFF', note: 'Text on primary purple button' },
    ],
  },
];

const TYPE = [
  { tag: 'H1', token: '--rf-fs-h1', weight: 300, meta: '$rf-fs-h1 · Light 300 · 32px', sample: 'RainFocus Summit' },
  { tag: 'H2', token: '--rf-fs-h2', weight: 600, meta: '$rf-fs-h2 · SemiBold 600 · 24px', sample: 'Event setup guide' },
  { tag: 'H3', token: '--rf-fs-h3', weight: 600, meta: '$rf-fs-h3 · SemiBold 600 · 20px', sample: 'Attendee' },
  { tag: 'Body', token: '--rf-fs-body-workflow', weight: 400, meta: '$rf-fs-body-workflow · Regular 400 · 16px / lh 24', sample: 'See the available list of modules below.' },
  { tag: 'Admin', token: '--rf-fs-body-admin', weight: 400, meta: '$rf-fs-body-admin · Regular 400 · 14px', sample: 'Card titles, nav labels' },
  { tag: 'Desc', token: '--rf-fs-desc', weight: 400, meta: '$rf-fs-desc · Regular 400 · 12px', sample: 'Card descriptions, sub-item nav text' },
  { tag: 'H5', token: '--rf-fs-h5', weight: 700, meta: '$rf-fs-h5 · Open Sans Bold · 13px', sample: 'Card title H5', h5: true },
];

const SPACING = [
  { name: '$nav-rail-width', val: 63, note: 'Outer icon rail' },
  { name: '$nav-inner-width', val: 215, note: 'Inner nav column' },
  { name: '$nav-total-width', val: 278, note: 'rail + inner column' },
  { name: '$body-content-pad', val: 48, note: 'Body horizontal padding' },
  { name: '$grid-gutter', val: 24, note: 'Grid column gutter' },
];

// Each inner array is one demo row of column fractions.
const GRID_ROWS = [
  ['1-1'],
  ['1-2', '1-2'],
  ['1-3', '1-3', '1-3'],
  ['2-3', '1-3'],
  ['1-4', '1-4', '1-4', '1-4'],
  ['3-4', '1-4'],
  ['1-6', '1-6', '1-6', '1-6', '1-6', '1-6'],
];

// ---------------------------------------------------------------------------
// Code snippets shown in the Storybook-style windows.
// ---------------------------------------------------------------------------

const COLOR_CODE = `// styles/_variables.scss
$rf-brand-primary:  #5C00DC; // Edit event button, active nav, links
$rf-brand-pink:     #ED1A5D; // rf logo
$rf-brand-berry:    #E71356; // attendee person icon
$rf-brand-grape-3:  #AB99FF; // attendee portal accent
$rf-color-surface:  #FFFFFF; // card / sidebar background
$rf-color-border:   #CBC6DE; // card borders, dividers

// Use the SCSS variable inside a module:
.cta { background: $rf-brand-primary; }

// …or the runtime CSS custom property (overridable by themes):
.cta { background: var(--rf-brand-primary); }`;

const TYPE_CODE = `// Fluid type scale — exposed as CSS custom properties on :root.
.page-title { font-size: var(--rf-fs-h1); font-weight: 300; }       // H1
.section    { font-size: var(--rf-fs-h2); font-weight: 600; }       // H2
.body-copy  { font-size: var(--rf-fs-body-workflow); line-height: 24px; }
.card-desc  { font-size: var(--rf-fs-desc); }                       // 12px

// Open Sans Bold "H5" token:
.small-head { font-family: var(--rf-font-family-h5); font-weight: 700; }`;

const GRID_CODE = `{/* Fractional flex grid: col-{N}-{D} means "N of D". */}
<div className="row">
  <div className="col-2-3">two thirds</div>
  <div className="col-1-3">one third</div>
</div>

<div className="row">
  <div className="col-1-4">1/4</div>
  <div className="col-1-4">1/4</div>
  <div className="col-1-4">1/4</div>
  <div className="col-1-4">1/4</div>
</div>

{/* Columns stack to full width below the $md (768px) breakpoint. */}`;

const SPACING_CODE = `// styles/_variables.scss — layout dimensions (from Figma)
$nav-rail-width:   63px;   // outer icon rail
$nav-inner-width:  215px;  // inner nav column
$nav-total-width:  $nav-rail-width + $nav-inner-width; // 278px
$body-content-pad: 48px;   // body horizontal padding

// styles/_grid.scss
$grid-gutter: 24px;        // space between grid columns`;

const BUTTON_CODE = `import Button from '@/components/Button/Button';

<Button variant="primary">Edit event</Button>
<Button variant="secondary">Cancel</Button>`;

export default function StyleGuide() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHead}>
        <span className={styles.kicker}>Design System</span>
        <h1 className={styles.h1}>RainFocus Summit UI</h1>
        <p className={styles.lede}>
          A living reference for the tokens and primitives in{' '}
          <code>styles/_variables.scss</code> and <code>styles/_grid.scss</code>. Each panel pairs a
          live sample with the exact code you&apos;d copy into a component.
        </p>
      </header>

      {/* ---------------- Colors ---------------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Color</h2>
          <span className={styles.sectionNote}>styles/_variables.scss</span>
        </div>

        <Showcase title="Palette" description="Brand, surface, and text tokens. Exposed as SCSS variables and matching --rf-* CSS custom properties." lang="scss" code={COLOR_CODE}>
          {COLOR_GROUPS.map((g) => (
            <div key={g.group} className={styles.colorGroup}>
              <p className={styles.groupLabel}>{g.group}</p>
              <div className={styles.swatchGrid}>
                {g.items.map((c) => (
                  <div key={c.name} className={styles.swatch}>
                    <div className={styles.swatchColor} style={{ background: c.hex }} />
                    <div className={styles.swatchMeta}>
                      <p className={styles.swatchName}>{c.name}</p>
                      <p className={styles.swatchHex}>{c.hex}</p>
                      <p className={styles.swatchNote}>{c.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Showcase>
      </section>

      {/* ---------------- Typography ---------------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Typography</h2>
          <span className={styles.sectionNote}>Inter · fluid scale via clamp()</span>
        </div>

        <Showcase title="Type scale" description="Headings use a fluid clamp() scale; admin / desc sizes are fixed px. Values resolve from --rf-fs-* custom properties." lang="scss" code={TYPE_CODE}>
          <div className={styles.typeList}>
            {TYPE.map((t) => (
              <div key={t.tag} className={styles.typeRow}>
                <span
                  className={styles.typeSample}
                  style={{
                    fontSize: `var(${t.token})`,
                    fontWeight: t.weight,
                    fontFamily: t.h5 ? 'var(--rf-font-family-h5)' : undefined,
                  }}
                >
                  {t.sample}
                </span>
                <span className={styles.typeMeta}>{t.meta}</span>
              </div>
            ))}
          </div>
        </Showcase>
      </section>

      {/* ---------------- Spacing & layout ---------------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Spacing &amp; layout</h2>
          <span className={styles.sectionNote}>Drawn to scale (1px = 1px)</span>
        </div>

        <Showcase title="Layout dimensions" description="Fixed structural sizes from the Figma frame. Bars are rendered at their true pixel width." lang="scss" code={SPACING_CODE}>
          <div className={styles.spaceList}>
            {SPACING.map((s) => (
              <div key={s.name} className={styles.spaceRow}>
                <span className={styles.spaceBar} style={{ width: `${s.val}px` }} />
                <span className={styles.spaceLabel}>{s.name}</span>
                <span className={styles.spaceVal}>
                  {s.val}px — {s.note}
                </span>
              </div>
            ))}
          </div>
        </Showcase>
      </section>

      {/* ---------------- Grid ---------------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Grid</h2>
          <span className={styles.sectionNote}>styles/_grid.scss · col-{'{'}N{'}'}-{'{'}D{'}'}</span>
        </div>

        <Showcase
          title="Fractional columns"
          description="A 12-column flex grid where each column is named by the fraction it fills — col-2-3 = two thirds. Columns wrap when fractions exceed 100% and stack below 768px."
          lang="jsx"
          code={GRID_CODE}
        >
          <div className={styles.gridDemo}>
            {GRID_ROWS.map((cols, i) => (
              <div className="row" key={i}>
                {cols.map((c, j) => (
                  <div className={`col-${c}`} key={j}>
                    <div className={styles.gridCell}>{c.replace('-', '/')}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Showcase>
      </section>

      {/* ---------------- Components ---------------- */}
      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Components</h2>
          <span className={styles.sectionNote}>components/Button</span>
        </div>

        <Showcase title="Button" description="Solid primary and outlined secondary variants. 4px radius, 14px bold label, accessible focus ring." lang="jsx" code={BUTTON_CODE}>
          <div className={styles.componentRow}>
            <Button variant="primary">Edit event</Button>
            <Button variant="secondary">Cancel</Button>
          </div>
        </Showcase>
      </section>
    </div>
  );
}
