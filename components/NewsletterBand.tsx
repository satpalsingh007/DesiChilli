"use client";

import { FormEvent, useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();

    if (!EMAIL_PATTERN.test(value)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 400));
    console.log("newsletter-subscribe", { email: value });

    setSubmitting(false);
    setSuccess(true);
  }

  return (
    <div className="newsband" id="newsletter">
      <div className="wrap newsband-inner">
        <div>
          <h3>Never miss a masala moment</h3>
          <p>
            One email a day with the recaps, hot takes, and elimination news that matter. No
            spam, just spice.
          </p>
        </div>
        {success ? (
          <div className="news-success" role="status">
            <strong>Check your inbox</strong>
            You&apos;re on the list. Tomorrow&apos;s recap is already on its way.
          </div>
        ) : (
          <form className="news-form" onSubmit={onSubmit} noValidate>
            <div>
              <input
                type="email"
                name="email"
                placeholder="you@email.com"
                aria-label="Email address"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "newsletter-error" : undefined}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError("");
                }}
                disabled={submitting}
              />
              {error ? (
                <p className="field-error" id="newsletter-error" role="alert">
                  {error}
                </p>
              ) : null}
            </div>
            <button type="submit" disabled={submitting}>
              {submitting ? "Sending" : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
