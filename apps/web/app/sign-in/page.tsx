"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <main className="container section">
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0 }}>Staff sign in</h1>
      <p className="muted" style={{ marginTop: 8 }}>
        Computer Buddy Console — retailers only
      </p>

      <div className="card" style={{ marginTop: 20 }}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setLoading(true);

            const res = await signIn("credentials", {
              email,
              password,
              redirect: false,
              callbackUrl: "/app",
            });

            setLoading(false);

            if (!res || res.error) setError("Invalid email or password.");
            else window.location.href = res.url ?? "/app";
          }}
        >
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          {error ? (
            <p style={{ color: "#ff6b35", fontWeight: 700 }}>{error}</p>
          ) : null}

          <button
            className="button primary"
            type="submit"
            disabled={loading}
            style={{ width: "100%" }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
