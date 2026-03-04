export default function NotFound() {
  return (
    <main className="section" aria-labelledby="not-found-title">
      <div className="container support-panel">
        <p className="eyebrow">Page not found</p>
        <h1 id="not-found-title">We couldn’t find that page.</h1>
        <p>
          The link may be outdated or mistyped. You can return to the homepage or contact support and we’ll
          help you find what you need.
        </p>
        <ul>
          <li>
            <a href="/">Go to homepage</a>
          </li>
          <li>
            <a href="mailto:support@computerbuddy.example">Email support</a>
          </li>
        </ul>
      </div>
    </main>
  );
}
