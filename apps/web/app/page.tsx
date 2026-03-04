const featuredCategories = [
  {
    name: 'Prebuilt Gaming PCs',
    description: 'Curated systems with tested compatibility for smooth 1080p, 1440p, and 4K gaming.',
  },
  {
    name: 'DIY PC Components',
    description: 'GPUs, CPUs, RAM, storage, and cooling selected with easy-to-compare specifications.',
  },
  {
    name: 'Streaming & Creator Gear',
    description: 'Monitors, capture tools, and audio hardware designed for reliability and clear setup paths.',
  },
];

const accessibilityHighlights = [
  'Keyboard-first navigation with visible focus indicators',
  'Improved color contrast and readable spacing',
  'Semantic landmarks for better screen reader support',
  'Helpful fallback links when a page cannot be found',
];

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="site-header" aria-label="Site header">
        <div className="container header-inner">
          <p className="logo" aria-label="Computer Buddy home">
            Computer Buddy
          </p>
          <nav aria-label="Primary navigation">
            <ul className="nav-list">
              <li>
                <a href="#categories">Categories</a>
              </li>
              <li>
                <a href="#accessibility">Accessibility</a>
              </li>
              <li>
                <a href="#support">Support</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="container">
            <p className="eyebrow">Inclusive gaming starts here</p>
            <h1 id="hero-title">A faster, clearer, and more accessible Computer Buddy experience</h1>
            <p className="hero-copy">
              We revamped the website so every customer can shop confidently, understand compatibility faster,
              and reach support without dead ends.
            </p>
            <div className="hero-actions" role="group" aria-label="Primary actions">
              <a className="button primary" href="#categories">
                Explore categories
              </a>
              <a className="button secondary" href="#support">
                Get support
              </a>
            </div>
          </div>
        </section>

        <section id="categories" className="section" aria-labelledby="categories-title">
          <div className="container">
            <h2 id="categories-title">Featured shopping areas</h2>
            <ul className="card-grid" aria-label="Product categories">
              {featuredCategories.map((category) => (
                <li className="card" key={category.name}>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="accessibility" className="section muted" aria-labelledby="accessibility-title">
          <div className="container">
            <h2 id="accessibility-title">Accessibility improvements in this revamp</h2>
            <ul className="check-list">
              {accessibilityHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="support" className="section" aria-labelledby="support-title">
          <div className="container support-panel">
            <h2 id="support-title">Need help now?</h2>
            <p>
              If you followed an outdated link, you'll now get a clear, accessible not-found page with direct recovery options.
              You can also use the links below for direct support.
            </p>
            <ul>
              <li>
                <a href="mailto:support@computerbuddy.example">Email support</a>
              </li>
              <li>
                <a href="/">Return to homepage</a>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
